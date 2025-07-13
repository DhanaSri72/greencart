
import { NavLink, Outlet, Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
    const {  axios , navigate} = useAppContext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
       try{
        const {data} = await axios.get('/api/seller/logout');
        if(data.success){
            toast.success(data.message)
            navigate('/')
        }else{
            toast.error(data.message)
        }
       }catch(error){
            toast.error(error.message)
       }
    };

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <Link to='/'>
                    <img className="cursor-pointer w-34 md:w-38" src={assets.logo} alt="logo" />
                </Link>
                <div className="flex items-center gap-5 text-gray-600">
                    <p>Hi! Admin</p>
                    <button
                        onClick={logout}
                        className="border border-gray-400 rounded-full text-sm px-4 py-1 hover:bg-gray-100 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
   {/* Sidebar + Main Content */}
   <div className="flex">
                {/* Sidebar */}
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col  bg-white">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === '/seller'}
                            className={({ isActive }) =>
                                `flex items-center py-3 px-4 gap-3 transition-all duration-200 ease-in-out
                                ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-green-100 border-green-500 text-green-600"
                                    : "hover:bg-gray-100 border-white text-gray-700"}`
                            }
                        >
                            <img src={item.icon} alt="" className="w-7 h-7" />
                            <p className="md:block hidden font-medium">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

       {/* Main Content */}
       <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default SellerLayout;

