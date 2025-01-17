import { Tool } from '../types';

let tools: Tool[] = [
  {
    id: '1',
    name: 'Modern Tractor',
    description: 'High-performance tractor suitable for large fields',
    pricePerDay: 150,
    image: 'https://www.profi.co.uk/wp-content/uploads/sites/8/2022/01/8a._jd_7r330_ap.jpg?w=900',
    category: 'Heavy Machinery',
    available: true,
    rentalPeriod: {
      minDays: 1,
      maxDays: 30
    },
    lenderInfo: {
      name: 'John Doe',
      contact: '+91 98765 43210'
    }
  },
  {
    id: '2',
    name: 'Professional Hoe Set',
    description: 'Set of 5 different hoes for various gardening needs',
    pricePerDay: 25,
    image: 'https://m.media-amazon.com/images/I/51a7HfzGdFL.jpg',
    category: 'Hand Tools',
    available: true,
    rentalPeriod: {
      minDays: 1,
      maxDays: 7
    },
    lenderInfo: {
      name: 'Jane Smith',
      contact: '+91 98765 43211'
    }
  },
  {
    id: '3',
    name: 'Irrigation System',
    description: 'Sprinkler Irrigation. Sprinkler irrigation uses a series of pipes to move water from the source to specially designed spray heads.',
    pricePerDay: 125,
    image: 'https://blog.dixonvalve.com/hs-fs/hubfs/Blog/2024/History%20and%20Types%20of%20Irrigation/pivot%20irrigation.jpg?width=800&height=508&name=pivot%20irrigation.jpg',
    category: 'Heavy Machinery',
    available: true,
    rentalPeriod: {
      minDays: 1,
      maxDays: 10
    },
    lenderInfo: {
      name: 'Jane Smith',
      contact: '+91 98765 43211'
    }
  },
  {
    id: '4',
    name: 'Crop Harvester',
    description: 'A combine harvester, also known as a combine, is a large agricultural machine that is used to harvest crops such as wheat, corn, soybeans, and other grains.',
    pricePerDay: 25,
    image: 'https://www.deere.com/assets/images/region-4/products/harvesting/r4k010997-rrd-1365x768.jpg',
    category: 'Heavy Machinery',
    available: true,
    rentalPeriod: {
      minDays: 1,
      maxDays: 7
    },
    lenderInfo: {
      name: 'Jane Smith',
      contact: '+91 98765 43211'
    }
  }
];

export const getAllTools = (): Tool[] => {
  return tools;
};

export const addTool = (tool: Omit<Tool, 'id'>): Tool => {
  const newTool: Tool = {
    ...tool,
    id: (tools.length + 1).toString(),
  };
  
  tools = [...tools, newTool];
  return newTool;
};

export const deleteTool = (id: string): void => {
  tools = tools.filter(tool => tool.id !== id);
};