import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header className="header  top-0 bg-[#E0A96D] shadow-md flex items-center justify-between px-8 py-02 text-white rounded-md">
      <h1 className="w-3/12">
        <a href=""></a>
      </h1>

      <nav className="nav font-semibold text-lg">
        <ul className="flex items-center">
          <Link to={"/"}>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              <a href="">Home</a>
            </li>
          </Link>
          <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
            <a href="">About</a>
          </li>
          <Link to={"playlist"}>
            <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <a href="">Charts</a>
            </li>
          </Link>
        </ul>
      </nav>

      <div className="w-3/12 flex justify-end"></div>
    </header>
  );
};

export default Navbar;
