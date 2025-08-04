import products from "@/services/mockData/products.json";

export const ProductService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...products];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return products.find(product => product.Id === id) || null;
  },

  getFeatured: async () => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return products.filter(product => product.featured);
  },

  getByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  },

  search: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  },

  create: async (productData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newId = Math.max(...products.map(p => p.Id)) + 1;
    const newProduct = {
      Id: newId,
      ...productData,
      createdAt: new Date().toISOString()
    };
    products.push(newProduct);
    return { ...newProduct };
  },

  update: async (id, productData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = products.findIndex(product => product.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    
    products[index] = {
      ...products[index],
      ...productData,
      Id: id,
      updatedAt: new Date().toISOString()
    };
    
    return { ...products[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = products.findIndex(product => product.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    
    const deletedProduct = products.splice(index, 1)[0];
    return deletedProduct;
  }
};