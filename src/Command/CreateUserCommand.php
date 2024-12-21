<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class CreateUserCommand extends Command
{
    private $em;
    private $passwordEncoder;

    public function __construct(EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
    {
        parent::__construct();
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
    }

    protected static $defaultName = 'app:create-user';

    protected function configure(): void
    {
        $this
            ->setDescription('Créer un nouvel utilisateur dans la base de données.')
            ->setHelp('Cette commande  permet de créer un nouvel utilisateur à des fins de test.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        // Création d'un utilisateur
        $user = new User();
        $user->setUsername('test');
        $user->setFirstname('John');
        $user->setLastname('Doe');
        $user->setPhone('0666666666');
        $user->setRole('user');
        $user->setCreatedAt(new \DateTime());

        // Hachage du mot de passe
        $hashedPassword = $this->passwordEncoder->encodePassword($user, 'testpassword');
        $user->setPassword($hashedPassword);

        // Sauvegarder l'utilisateur
        $this->em->persist($user);
        $this->em->flush();

        $output->writeln('Utilisateur créé avec succès !');

        return Command::SUCCESS;
    }
}