<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class SecurityController extends AbstractController
{
    /**
     * @Route("/", name="app_login")
     */
    public function login(Request $request, EntityManagerInterface $em, SessionInterface $session): Response
    {
        // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
        if ($this->getUser()) {
            return $this->redirectToRoute('app_dashboard');
        }

        // Traiter le formulaire de connexion
        $username = $request->request->get('username');
        $password = $request->request->get('password');

        if ($username && $password) {
            $user = $em->getRepository(User::class)->findOneBy(['username' => $username]);

            if ($user && password_verify($password, $user->getPassword())) {
                // Si l'utilisateur est trouvé et le mot de passe correspond, on se connecte
                $session->set('user', $user); // On stocke l'utilisateur dans la session
                return $this->redirectToRoute('app_dashboard'); // On redirige vers la page d'accueil
            } else {
                $this->addFlash('error', 'Nom d\'utilisateur ou mot de passe incorrect.');
            }
        }

        return $this->render('security/index.html.twig');
    }

    /**
     * @Route("/dashboard", name="app_dashboard")
     */
    public function dashboard(SessionInterface $session)
    {
        $user = $session->get('user');
        
        if (!$user) {
            return $this->redirectToRoute('app_login');
        }

        // Récupérer le rôle de l'utilisateur
        $role = $user->getRole();

        return $this->render('security/dashboard.html.twig', [
            'role' => $role,
        ]);
    }
}