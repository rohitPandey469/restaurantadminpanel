import React from "react";
import { Link } from "react-router-dom";

const Footer = ({user}) => {
  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-2 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div>
              <span className="text-amber-50 font-bold text-2xl">Benne Berlin</span>
              <p className="mt-2 text-sm text-amber-200">South Indian Cuisine</p>
            </div>
            <p className="text-amber-200 text-base leading-6">
            Experience the rich heritage of South India with authentic delicacies like dosa, idly, and more — crafted from traditional recipes passed down through generations.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-amber-300 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="/whatsapp" className="text-amber-300 hover:text-white transition-colors">
                <span className="sr-only">WhatsApp</span>
                <svg fill="currentColor" className="h-6 w-6" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 308 308" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_468_"> <path id="XMLID_469_" d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"></path> <path id="XMLID_470_" d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"></path> </g> </g></svg>
              </a>
            </div>
          </div>
          <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-between"}} className="mt-12">
            <div>
              <h3 className="text-sm font-semibold text-amber-100 tracking-wider uppercase">Navigation</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link onClick={()=>{
                    window.scrollTo(0, 0);
                  }} to="/" className="text-base text-amber-200 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                  onClick={()=>{
                    window.scrollTo(0, 0);
                  }}
                  to="/menu" className="text-base text-amber-200 hover:text-white transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                  onClick={()=>{
                    window.scrollTo(0, 0);
                  }}
                  to="/reserve" className="text-base text-amber-200 hover:text-white transition-colors">
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link
                  onClick={()=>{
                    window.scrollTo(0, 0);
                  }}
                  to="/review" className="text-base text-amber-200 hover:text-white transition-colors">
                    Review
                  </Link>
                </li>
                <li>
                  <Link
                  onClick={()=>{
                    window.scrollTo(0, 0);
                  }}
                  to="/coming-soon" className="text-base text-amber-200 hover:text-white transition-colors">
                    Coming Soon
                  </Link>
                </li>
              </ul>
            </div>
            {user && (
              <div>
              <h3 className="text-sm font-semibold text-amber-100 tracking-wider uppercase">Admin</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                  onClick={()=>{
                    window.scrollTo(0, 0);
                  }}
                  to="/admin/dashboard" className="text-base text-amber-200 hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                  onClick={()=>{
                    window.scrollTo(0, 0);
                  }}
                  to="/admin/menu" className="text-base text-amber-200 hover:text-white transition-colors">
                    Menu Management
                  </Link>
                </li>
                <li>
                  <Link
                  onClick={()=>{
                    window.scrollTo(0, 0);
                  }}
                  to="/admin/banners" className="text-base text-amber-200 hover:text-white transition-colors">
                    Banner Management
                  </Link>
                </li>
              </ul>
            </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-amber-100 tracking-wider uppercase">Contact</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-amber-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-amber-200">
                    Lützowstraße 81, <br />
                    10785 Berlin
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-amber-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-amber-200">+91 98765 43210</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-amber-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-amber-200">example@benneberlin.com</span>
                </li>
                <li className="text-amber-200">
                  <p className="font-medium">Hours:</p>
                  <p>Mon-Sat: 11:00 AM - 10:00 PM</p>
                  <p>Sunday: 12:00 PM - 9:00 PM</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-amber-800 pt-8">
          <p className="text-base text-amber-300 text-center">&copy; 2025 Benne Berlin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;