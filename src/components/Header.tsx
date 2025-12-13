import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center gap-2">
          <div className="d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
            <Image src="/favicon.jpg" alt="Iconite Earth" width={40} height={40} />
          </div>
          {/* <span className="fw-semibold fs-5 text-dark">Iconite Earth</span> */}
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent"
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-center gap-lg-4">
            <li className="nav-item">
              <Link href="/" className="nav-link text-dark fw-normal">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link text-dark fw-normal">Products</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="btn btn-primary text-white ms-lg-2 px-4">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
