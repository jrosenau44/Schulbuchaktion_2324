<?php

namespace App\Controller;

use App\Entity\Book;
use App\Entity\BookPrice;
use App\Repository\BookPriceRepository;
use App\Service\AuthService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Context\Normalizer\ObjectNormalizerContextBuilder;


/**
 * Class MoneyListController
 * Retrieve a moneylist with the given id
 */
class MoneyListController extends AbstractController {
    /**
     * This method returns the moneylist with the given book id.
     *
     * @param AuthService $authService - an instance of the AuthService service class for authentication
     * @param Request $request - the incoming HTTP request
     * @param ManagerRegistry $registry - an instance of the Doctrine ManagerRegistry service class for database management
     * @param int $id - the id of the book for which to retrieve the moneylist
     *
     * @return Response - a JSON response containing the moneylist object or a null value with an appropriate status code
     */
    #[Route(
        path: '/moneylist/{id}',
        name: 'app_moneylist_get_by_book_id',
        methods: ['GET']
    )]
    public function getMoneyListByBookId(AuthService $authService, Request $request, ManagerRegistry $registry, int $id): Response {
        $user = $authService->authenticateByAuthorizationHeader($request);
        if ($user->getRole()->getName() == "Admin" || $user->getRole()->getName() == "Abteilungsvorstand") {
            // Create a context object for the ObjectNormalizer that specifies the serialization groups to use
            $context = (new ObjectNormalizerContextBuilder())
                ->withGroups('bookPrice')
                ->toArray();

            // Get the BookPrice entity with the given book id from the database
            $moneylist = $registry->getRepository(BookPrice::class)->find($id);

            if (isset($moneylist)) {
                // Return a JSON response with the BookPrice entity and the specified serialization groups
                return $this->json($moneylist, status: Response::HTTP_OK, context: $context);

            }
            // Return a null JSON response with a NOT_FOUND status code if the BookPrice entity is not found
            return $this->json(null, status: Response::HTTP_NOT_FOUND);
        } else {
            // Return a null response with an UNAUTHORIZED status code if the user is not authorized to access the resource
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * Creates a moneylist in the database.
     * Considers roles of the user.
     * 
     * @return Response
     */
    #[Route(
        path: "/moneylist/write",
        name: "app_moneylist_write",
        methods: ["POST"]
    )]
    public function addMoneyList(
        AuthService $authService,
        Request $request,
        ManagerRegistry $registry,
        BookPriceRepository $priceRepository,
    ): Response {
        $user = $authService->authenticateByAuthorizationHeader($request);
        if (!isset($user)) {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        
        if ($user->getRole()->getName() == "Admin" || 
            $user->getRole()->getName() == "Abteilungsvorstand" ||
            $user->getRole()->getName() == "Fachverantwortlicher"
        ) {
            $data = json_decode($request->getContent());
            
            $bookPrice = new BookPrice();
            $bookPrice->setYear($data->year);
            $bookPrice->setPriceInclusiveEbook($data->priceInclusiveEbook);
            $bookPrice->setPriceEbook($data->priceEbook);
            $bookPrice->setPriceEbookPlus($data->priceEbookPlus);
            $bookPrice->setBook($registry->getRepository(Book::class)->find($data->book));
            $priceRepository->save($bookPrice, true);

            return new Response(null, Response::HTTP_OK);
        }
        
        return $this->json(null, status: Response::HTTP_NOT_FOUND);
    }
    
    /**
     * Deletes a moneylist in the database.
     * Considers roles of the user.
     *
     * @return Response
     */
    #[Route(
        path: "/moneylist/delete/{id}",
        name: "app_moneylist_delete",
        methods: ["DELETE"]
    )]
    public function deleteMoneyList(
        AuthService $authService,
        Request $request,
        int $id,
        BookPriceRepository $priceRepository
    ): Response {
        $user = $authService->authenticateByAuthorizationHeader($request);
        if (!isset($user)) {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }

        if ($user->getRole()->getName() == "Admin" ||
            $user->getRole()->getName() == "Abteilungsvorstand" ||
            $user->getRole()->getName() == "Fachverantwortlicher"
        ) {
            $bookPrice = $priceRepository->find($id);

            if (isset($bookPrice)) {
                $priceRepository->remove($bookPrice, true);
                return new Response(null, Response::HTTP_OK);
            }
        }

        return $this->json(null, status: Response::HTTP_NOT_FOUND);
    }
}
