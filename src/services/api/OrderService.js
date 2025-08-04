import { toast } from "react-toastify";

export const OrderService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "items"
            }
          },
          {
            field: {
              Name: "shipping"
            }
          },
          {
            field: {
              Name: "payment"
            }
          },
          {
            field: {
              Name: "total"
            }
          },
          {
            field: {
              Name: "subtotal"
            }
          },
          {
            field: {
              Name: "tax"
            }
          },
          {
            field: {
              Name: "shippingCost"
            }
          },
          {
            field: {
              Name: "status"
            }
          },
          {
            field: {
              Name: "createdAt"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "createdAt",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("order", params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      // Transform JSON strings back to objects
      return response.data.map(order => ({
        ...order,
        items: order.items ? JSON.parse(order.items) : [],
        shipping: order.shipping ? JSON.parse(order.shipping) : {},
        payment: order.payment ? JSON.parse(order.payment) : {}
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching orders:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  getById: async (orderId) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "items"
            }
          },
          {
            field: {
              Name: "shipping"
            }
          },
          {
            field: {
              Name: "payment"
            }
          },
          {
            field: {
              Name: "total"
            }
          },
          {
            field: {
              Name: "subtotal"
            }
          },
          {
            field: {
              Name: "tax"
            }
          },
          {
            field: {
              Name: "shippingCost"
            }
          },
          {
            field: {
              Name: "status"
            }
          },
          {
            field: {
              Name: "createdAt"
            }
          }
        ]
      };
      
      // Handle both string and numeric order IDs
      let recordId = orderId;
      if (typeof orderId === 'string' && orderId.startsWith('GM')) {
        // For string IDs like "GM123ABC", search by Name field
        const searchParams = {
          ...params,
          where: [
            {
              FieldName: "Name",
              Operator: "EqualTo",
              Values: [orderId]
            }
          ]
        };
        
        const response = await apperClient.fetchRecords("order", searchParams);
        
        if (!response || !response.data || response.data.length === 0) {
          return null;
        }
        
        const order = response.data[0];
        return {
          ...order,
          items: order.items ? JSON.parse(order.items) : [],
          shipping: order.shipping ? JSON.parse(order.shipping) : {},
          payment: order.payment ? JSON.parse(order.payment) : {}
        };
      } else {
        // For numeric IDs, use getRecordById
        const response = await apperClient.getRecordById("order", parseInt(recordId), params);
        
        if (!response || !response.data) {
          return null;
        }
        
        const order = response.data;
        return {
          ...order,
          items: order.items ? JSON.parse(order.items) : [],
          shipping: order.shipping ? JSON.parse(order.shipping) : {},
          payment: order.payment ? JSON.parse(order.payment) : {}
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching order with ID ${orderId}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  create: async (orderData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Generate order ID
      const orderId = "GM" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
      
      const params = {
        records: [
          {
            Name: orderId,
            Tags: orderData.Tags || orderData.tags || "",
            items: JSON.stringify(orderData.items || []),
            shipping: JSON.stringify(orderData.shipping || {}),
            payment: JSON.stringify(orderData.payment || {}),
            total: parseFloat(orderData.total) || 0,
            subtotal: parseFloat(orderData.subtotal) || 0,
            tax: parseFloat(orderData.tax) || 0,
            shippingCost: parseFloat(orderData.shippingCost) || 0,
            status: orderData.status || "confirmed",
            createdAt: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.createRecord("order", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create order ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const order = successfulRecords[0].data;
          return {
            ...order,
            Id: order.Name, // Use Name as the order ID for frontend
            items: order.items ? JSON.parse(order.items) : [],
            shipping: order.shipping ? JSON.parse(order.shipping) : {},
            payment: order.payment ? JSON.parse(order.payment) : {}
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating order:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  update: async (orderId, orderData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [
          {
            Id: parseInt(orderId),
            Name: orderData.Name || orderData.name || orderId,
            Tags: orderData.Tags || orderData.tags || "",
            items: JSON.stringify(orderData.items || []),
            shipping: JSON.stringify(orderData.shipping || {}),
            payment: JSON.stringify(orderData.payment || {}),
            total: parseFloat(orderData.total) || 0,
            subtotal: parseFloat(orderData.subtotal) || 0,
            tax: parseFloat(orderData.tax) || 0,
            shippingCost: parseFloat(orderData.shippingCost) || 0,
            status: orderData.status || "confirmed",
            updatedAt: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.updateRecord("order", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update order ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const order = successfulUpdates[0].data;
          return {
            ...order,
            items: order.items ? JSON.parse(order.items) : [],
            shipping: order.shipping ? JSON.parse(order.shipping) : {},
            payment: order.payment ? JSON.parse(order.payment) : {}
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating order:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  updateStatus: async (orderId, status) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [
          {
            Id: parseInt(orderId),
            status: status,
            updatedAt: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.updateRecord("order", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update order status ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const order = successfulUpdates[0].data;
          return {
            ...order,
            items: order.items ? JSON.parse(order.items) : [],
            shipping: order.shipping ? JSON.parse(order.shipping) : {},
            payment: order.payment ? JSON.parse(order.payment) : {}
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating order status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  delete: async (orderId) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(orderId)]
      };
      
      const response = await apperClient.deleteRecord("order", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete order ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting order:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};