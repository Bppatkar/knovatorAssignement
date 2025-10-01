import Order from '../models/Order.js';

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { firstName, lastName, address, items, totalAmount } = req.body;

    // Validation
    if (!firstName || !lastName || !address) {
      return res.status(400).json({
        message: 'First name, last name, and address are required',
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: 'Cart cannot be empty',
      });
    }

    // Create new order
    const order = new Order({
      firstName,
      lastName,
      address,
      items,
      totalAmount,
    });

    const savedOrder = await order.save();

    // Log order details (as per requirement)
    console.log('Order placed successfully:', {
      orderId: savedOrder._id,
      customer: `${firstName} ${lastName}`,
      address: address,
      items: items.length,
      totalAmount: totalAmount,
      timestamp: new Date().toISOString(),
    });

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: savedOrder._id,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error placing order',
      error: error.message,
    });
  }
};

export default placeOrder;
