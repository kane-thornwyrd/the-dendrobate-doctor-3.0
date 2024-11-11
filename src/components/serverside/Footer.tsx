import { KissKissBankBankLogo } from "./KissKissBankBankLogo";
import { Facebook, Mail, Youtube } from 'lucide-react';

export const Footer = () => (<footer className="bg-gradient-to-b from-stone-100 to-stone-300 max-w-6xl mx-auto py-4 px-12 text-center print:hidden text-green-700 items-center grid grid-cols-2 gap-3 md:grid-cols-4">
<a className='flex flex-col hover:animate-pulse px-6 items-center place-content-center' href="https://www.kisskissbankbank.com/fr/projects/the-dendrobate-doctor"><small className='w-full'>Nous soutenir/remercier: </small><KissKissBankBankLogo size={26} className='drop-shadow-md'/></a>
<a className='flex flex-col items-center place-content-center hover:animate-pulse px-6' href="https://www.youtube.com/channel/UCEz2bxvWCWpudAH-wpJuKOw"><small className='w-full'>La chaine: </small><Youtube size={32} className='drop-shadow-md'/></a>
<a className='flex flex-col items-center place-content-center hover:animate-pulse px-6' href="https://www.facebook.com/TheDendrobateDoctor"><small className='w-full'>La page: </small><Facebook size={24} className='drop-shadow-md'/></a>
<a className='flex flex-col items-center place-content-center hover:animate-pulse px-6' href="mailto:thedendrobatedoctor+backupblog@gmail.com"><small className='w-full'>Nous joindre par e-mail: </small><Mail size={24} className='drop-shadow-md'/></a>
</footer>)