import { toast } from "react-toastify";

export const ProductService = {
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
              Name: "description"
            }
          },
          {
            field: {
              Name: "price"
            }
          },
          {
            field: {
              Name: "originalPrice"
            }
          },
          {
            field: {
              Name: "category"
            }
          },
          {
            field: {
              Name: "images"
            }
          },
          {
            field: {
              Name: "stock"
            }
          },
          {
            field: {
              Name: "featured"
            }
          },
          {
            field: {
              Name: "rating"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      // Transform images from MultilineText to array
      return response.data.map(product => ({
        ...product,
        name: product.Name,
        images: product.images ? product.images.split('\n').filter(img => img.trim()) : []
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  getById: async (id) => {
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
              Name: "description"
            }
          },
          {
            field: {
              Name: "price"
            }
          },
          {
            field: {
              Name: "originalPrice"
            }
          },
          {
            field: {
              Name: "category"
            }
          },
          {
            field: {
              Name: "images"
            }
          },
          {
            field: {
              Name: "stock"
            }
          },
          {
            field: {
              Name: "featured"
            }
          },
          {
            field: {
              Name: "rating"
            }
          }
        ]
      };
      
      const response = await apperClient.getRecordById("product", parseInt(id), params);
      
      if (!response || !response.data) {
        return null;
      }
      
      // Transform images from MultilineText to array
      const product = response.data;
      return {
        ...product,
        name: product.Name,
        images: product.images ? product.images.split('\n').filter(img => img.trim()) : []
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching product with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  getFeatured: async () => {
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
              Name: "description"
            }
          },
          {
            field: {
              Name: "price"
            }
          },
          {
            field: {
              Name: "originalPrice"
            }
          },
          {
            field: {
              Name: "category"
            }
          },
          {
            field: {
              Name: "images"
            }
          },
          {
            field: {
              Name: "stock"
            }
          },
          {
            field: {
              Name: "featured"
            }
          },
          {
            field: {
              Name: "rating"
            }
          }
        ],
        where: [
          {
            FieldName: "featured",
            Operator: "EqualTo",
            Values: [true]
          }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      // Transform images from MultilineText to array
      return response.data.map(product => ({
        ...product,
        name: product.Name,
        images: product.images ? product.images.split('\n').filter(img => img.trim()) : []
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching featured products:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  getByCategory: async (category) => {
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
              Name: "description"
            }
          },
          {
            field: {
              Name: "price"
            }
          },
          {
            field: {
              Name: "originalPrice"
            }
          },
          {
            field: {
              Name: "category"
            }
          },
          {
            field: {
              Name: "images"
            }
          },
          {
            field: {
              Name: "stock"
            }
          },
          {
            field: {
              Name: "featured"
            }
          },
          {
            field: {
              Name: "rating"
            }
          }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      // Transform images from MultilineText to array
      return response.data.map(product => ({
        ...product,
        name: product.Name,
        images: product.images ? product.images.split('\n').filter(img => img.trim()) : []
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching products by category ${category}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  search: async (query) => {
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
              Name: "description"
            }
          },
          {
            field: {
              Name: "price"
            }
          },
          {
            field: {
              Name: "originalPrice"
            }
          },
          {
            field: {
              Name: "category"
            }
          },
          {
            field: {
              Name: "images"
            }
          },
          {
            field: {
              Name: "stock"
            }
          },
          {
            field: {
              Name: "featured"
            }
          },
          {
            field: {
              Name: "rating"
            }
          }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "Name",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "description",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "category",
                    operator: "Contains",
                    values: [query]
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("product", params);
      
      if (!response || !response.data || response.data.length === 0) {
        return [];
      }
      
      // Transform images from MultilineText to array
      return response.data.map(product => ({
        ...product,
        name: product.Name,
        images: product.images ? product.images.split('\n').filter(img => img.trim()) : []
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error searching products for "${query}":`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  create: async (productData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [
          {
            Name: productData.Name || productData.name,
            Tags: productData.Tags || productData.tags || "",
            description: productData.description || "",
            price: parseFloat(productData.price) || 0,
            originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
            category: productData.category || "",
            images: Array.isArray(productData.images) ? productData.images.join('\n') : (productData.images || ""),
            stock: parseInt(productData.stock) || 0,
            featured: !!productData.featured,
            rating: parseInt(productData.rating) || 0
          }
        ]
      };
      
      const response = await apperClient.createRecord("product", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create product ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const product = successfulRecords[0].data;
          return {
            ...product,
            name: product.Name,
            images: product.images ? product.images.split('\n').filter(img => img.trim()) : []
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating product:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  update: async (id, productData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: productData.Name || productData.name,
            Tags: productData.Tags || productData.tags || "",
            description: productData.description || "",
            price: parseFloat(productData.price) || 0,
            originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
            category: productData.category || "",
            images: Array.isArray(productData.images) ? productData.images.join('\n') : (productData.images || ""),
            stock: parseInt(productData.stock) || 0,
            featured: !!productData.featured,
            rating: parseInt(productData.rating) || 0
          }
        ]
      };
      
      const response = await apperClient.updateRecord("product", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update product ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const product = successfulUpdates[0].data;
          return {
            ...product,
            name: product.Name,
            images: product.images ? product.images.split('\n').filter(img => img.trim()) : []
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating product:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  delete: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord("product", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete product ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting product:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};