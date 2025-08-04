import categories from "@/services/mockData/categories.json";

export const CategoryService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...categories];
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return categories.find(category => category.Id === id) || null;
  },

  getBySlug: async (slug) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return categories.find(category => category.slug === slug) || null;
  },

  create: async (categoryData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newId = Math.max(...categories.map(c => c.Id)) + 1;
    const newCategory = {
      Id: newId,
      ...categoryData,
      createdAt: new Date().toISOString()
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  update: async (id, categoryData) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    categories[index] = {
      ...categories[index],
      ...categoryData,
      Id: id,
      updatedAt: new Date().toISOString()
    };
    
    return { ...categories[index] };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    const deletedCategory = categories.splice(index, 1)[0];
    return deletedCategory;
  }
};