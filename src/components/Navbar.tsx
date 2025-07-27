import Link from 'next/link';
import { ModeToggle } from './ModeToggle';

function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between max-w-7xl mx-auto px-4 py-5">
      <div>
        <Link href="/" className="font-bold text-3xl">
          My<span className="text-primary">Blog</span>
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <ul className="flex items-center gap-5">
          <li>
            <Link href="/about" className="font-medium text-1xl">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="font-medium text-1xl">
              Contact
            </Link>
          </li>
        </ul>

        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
