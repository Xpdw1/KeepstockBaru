export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  next();
};

export const validateRegister = (req, res, next) => {
  const { username, password, name, role } = req.body;

  if (!username || !password || !name || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }

  if (!['store', 'manager', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  if (role === 'store' && !req.body.branch) {
    return res.status(400).json({ error: 'Branch is required for store users' });
  }

  next();
};

export const validateUserUpdate = (req, res, next) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required' });
  }

  if (!['store', 'manager', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  if (role === 'store' && !req.body.branch) {
    return res.status(400).json({ error: 'Branch is required for store users' });
  }

  next();
};

export const validateProduct = (req, res, next) => {
  const { sku, name, price, rackNumber, branch, stockNew } = req.body;

  if (!sku || !name || !price || !rackNumber || !branch) {
    return res.status(400).json({ 
      error: 'SKU, name, price, rack number, and branch are required' 
    });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  if (typeof stockNew !== 'number' || stockNew < 0) {
    return res.status(400).json({ error: 'Stock must be a non-negative number' });
  }

  next();
};

export const validateProductUpload = (req, res, next) => {
  const { products, branch } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Products array is required' });
  }

  if (!branch) {
    return res.status(400).json({ error: 'Branch is required' });
  }

  for (const product of products) {
    if (!product.sku || !product.name || !product.price || !product.rackNumber) {
      return res.status(400).json({ 
        error: 'Each product must have SKU, name, price, and rack number' 
      });
    }

    if (typeof product.price !== 'number' || product.price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' });
    }

    if (typeof product.stockNew !== 'number' || product.stockNew < 0) {
      return res.status(400).json({ error: 'Stock must be a non-negative number' });
    }
  }

  next();
};