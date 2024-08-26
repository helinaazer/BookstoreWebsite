import React from 'react';
import ItemCardBig from '../Components/ItemCardBig';
import NavBar from '../Components/NavBar';

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: 'Christopher Knight Home Daisy Outdoor Club Chair with Cushion (Set of 4), Teak Finish, Cream',
      description: '',
      price: 824.91,
      quantity: 1,
    },
    {
        id: 1,
        image: 'https://via.placeholder.com/150',
        title: 'Christopher Knight Home Daisy Outdoor Club Chair with Cushion (Set of 4), Teak Finish, Cream',
        description: '',
        price: 824.91,
        quantity: 1,
      },
      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        title: 'Christopher Knight Home Daisy Outdoor Club Chair with Cushion (Set of 4), Teak Finish, Cream',
        description: '',
        price: 824.91,
        quantity: 1,
      },
  ];

  const handleRemove = (id) => {
    console.log('Remove item with id:', id);
  };

  const handleSaveForLater = (id) => {
    console.log('Save for later item with id:', id);
  };

  return (
    <div>
        <NavBar />
        <h1>Shopping Cart</h1>
        {cartItems.map((item) => (
        <ItemCardBig
          key={item.id}
          image={item.image}
          title={item.title}
          description={item.description}
          price={item.price}
          quantity={item.quantity}
          onRemove={() => handleRemove(item.id)}
          onSaveForLater={() => handleSaveForLater(item.id)}
        />
      ))}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <h2>Subtotal ({cartItems.length} item): ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
