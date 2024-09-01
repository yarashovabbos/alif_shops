import React from 'react';
import {
  FaInstagram,
  FaFacebook,
  FaTelegramPlane,
  FaOdnoklassniki,
  FaTiktok,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Hujjatlar Section */}
        <div>
          <h5 className="font-semibold text-lg mb-4">Hujjatlar</h5>
          <ul>
            <li className="mb-2"><a href="#">Sotish uchun umumiy shartlar</a></li>
            <li className="mb-2"><a href="#">Ofertalar arxivi</a></li>
            <li className="mb-2"><a href="#">Nizom</a></li>
            <li className="mb-2"><a href="#">Guvohnoma</a></li>
          </ul>
        </div>

        {/* Servis Section */}
        <div>
          <h5 className="font-semibold text-lg mb-4">Servis</h5>
          <ul>
            <li className="mb-2"><a href="#">Namoz vaqti</a></li>
            <li className="mb-2"><a href="#">Muddati to'lov islomda</a></li>
            <li className="mb-2"><a href="#">alif shopda soting!</a></li>
            <li className="mb-2"><a href="#">Qaytarish</a></li>
          </ul>
        </div>

        {/* Tovarlar Katalogi Section */}
        <div>
          <h5 className="font-semibold text-lg mb-4">Tovarlar katalogi</h5>
          <ul>
            <li className="mb-2"><a href="#">Smartfonlar va telefonlar</a></li>
            <li className="mb-2"><a href="#">Gadjetlar</a></li>
            <li className="mb-2"><a href="#">Smartfonlar uchun aksessuarlar</a></li>
            <li className="mb-2"><a href="#">Tegishli tovarlar</a></li>
            <li className="mb-2"><a href="#">Soat va aksessuarlar</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h5 className="font-semibold text-lg mb-4">Biz ijtimoiy axborot vositalarida</h5>
          <div className="flex space-x-4 mb-6">
            <a href="#" aria-label="Instagram">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="#" aria-label="Telegram">
              <FaTelegramPlane className="text-2xl" />
            </a>
            <a href="#" aria-label="Odnoklassniki">
              <FaOdnoklassniki className="text-2xl" />
            </a>
            <a href="#" aria-label="Tiktok">
              <FaTiktok className="text-2xl" />
            </a>
          </div>
          <div>
            <p className="mb-2"><a href="mailto:alifshop_uz">@alifshop_uz</a></p>
            <p className="mb-2"><a href="tel:+998555121212">+998 555 12 12 12</a></p>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 border-t border-gray-700 pt-6">
        <p>2024 © alifshop.uz</p>
      </div>
    </footer>
  );
};

export default Footer;
