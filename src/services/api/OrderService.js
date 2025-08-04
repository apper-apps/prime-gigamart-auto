import orders from "@/services/mockData/orders.json";
import { generateOrderId } from "@/utils/formatters";

export const OrderService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...orders];
  },

  getById: async (orderId) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return orders.find(order => order.Id === orderId) || null;
  },

  create: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newOrder = {
      Id: generateOrderId(),
      ...orderData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    return { ...newOrder };
  },

  update: async (orderId, orderData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = orders.findIndex(order => order.Id === orderId);
    if (index === -1) {
      throw new Error("Order not found");
    }
    
    orders[index] = {
      ...orders[index],
      ...orderData,
      Id: orderId,
      updatedAt: new Date().toISOString()
    };
    
    return { ...orders[index] };
  },

  updateStatus: async (orderId, status) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = orders.findIndex(order => order.Id === orderId);
    if (index === -1) {
      throw new Error("Order not found");
    }
    
    orders[index] = {
      ...orders[index],
      status,
      updatedAt: new Date().toISOString()
    };
    
    return { ...orders[index] };
  },

  delete: async (orderId) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = orders.findIndex(order => order.Id === orderId);
    if (index === -1) {
      throw new Error("Order not found");
    }
    
    const deletedOrder = orders.splice(index, 1)[0];
    return deletedOrder;
  }
};