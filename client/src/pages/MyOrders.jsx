
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency, axios, user } = useAppContext();

  // Fetch user's orders from the API
  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user', { withCredentials: true });
      console.log("Fetched orders:", data.orders); // Debug log
      if (data.success && Array.isArray(data.orders)) {
        setMyOrders(data.orders);
      } else {
        setMyOrders([]); // Set empty array if no orders are found
      }
    } catch (error) {
      setError('Failed to fetch orders. Please try again later.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    } else {
      setLoading(false); // If no user, stop loading
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-end w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {myOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        myOrders.map((order, index) => (
          <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
            <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
              <span>Order Id: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total Amount: {currency}{order.amount}</span>
            </p>
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className={`relative bg-white text-gray-500/70 ${
                  order.items.length !== idx + 1 && 'border-b'
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
              >
                {item.product ? (
                  <>
                    <div className='flex items-center'>
                      <div className='bg-primary/10 p-4 rounded-lg'>
                        <img
                          src={item.product.image?.[0] || '/default-image.jpg'}
                          alt={item.product.name}
                          className='w-16 h-16'
                        />
                      </div>
                      <div className='ml-4'>
                        <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                        <p>Category: {item.product.category}</p>
                      </div>
                    </div>

                    <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                      <p>Quantity: {item.quantity || '1'}</p>
                      <p>Status: {order.status}</p>
                      <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className='text-primary text-lg font-medium'>
                      Amount: {currency}
                      {item.product.offerPrice * item.quantity}
                    </p>
                  </>
                ) : (
                  <p className="text-red-500 font-medium">⚠️ Product not found</p>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;

