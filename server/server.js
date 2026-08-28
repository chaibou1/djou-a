import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const spicesPath = path.join(__dirname, 'data', 'spices.json');
const recipesPath = path.join(__dirname, 'data', 'recipes.json');
const ordersPath = path.join(__dirname, 'data', 'orders.json');

const readJson = (filePath) => {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

const writeJson = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
};

// -------------------------------------------------------------
// 1. Spices API
// -------------------------------------------------------------
app.get('/api/spices', (req, res) => {
  const spices = readJson(spicesPath);
  const { category, search, featured } = req.query;

  let filtered = [...spices];

  if (category && category !== 'Tous') {
    filtered = filtered.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }

  if (featured === 'true') {
    filtered = filtered.filter((s) => s.isFeatured);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.origin.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: filtered.length, data: filtered });
});

app.get('/api/spices/:id', (req, res) => {
  const spices = readJson(spicesPath);
  const spice = spices.find((s) => s.id === req.params.id);
  if (!spice) {
    return res.status(404).json({ success: false, message: "Épice non trouvée" });
  }
  res.json({ success: true, data: spice });
});

// -------------------------------------------------------------
// 2. Recipes API
// -------------------------------------------------------------
app.get('/api/recipes', (req, res) => {
  const recipes = readJson(recipesPath);
  res.json({ success: true, count: recipes.length, data: recipes });
});

app.get('/api/recipes/:id', (req, res) => {
  const recipes = readJson(recipesPath);
  const recipe = recipes.find((r) => r.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ success: false, message: "Recette non trouvée" });
  }
  res.json({ success: true, data: recipe });
});

// -------------------------------------------------------------
// 3. Orders API (Client Order Creation + Admin Management)
// -------------------------------------------------------------
app.get('/api/orders', (req, res) => {
  const orders = readJson(ordersPath);
  res.json({ success: true, count: orders.length, data: orders });
});

app.post('/api/orders', (req, res) => {
  const { customer, items, packaging, notes } = req.body;

  if (!customer || !items || items.length === 0) {
    return res.status(400).json({ success: false, message: "Informations de commande incomplètes" });
  }

  const spices = readJson(spicesPath);
  const orders = readJson(ordersPath);

  let subtotal = 0;
  items.forEach((item) => {
    subtotal += (item.price || 0) * (item.quantity || 1);
  });

  const packagingFee = packaging?.includes('Bois') ? 5.00 : 0.00;
  const shippingFee = subtotal >= 60 ? 0.00 : 4.90;
  const total = Number((subtotal + packagingFee + shippingFee).toFixed(2));

  const newOrder = {
    id: `DJ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    customer,
    items,
    packaging: packaging || "Pochon en Lin Écologique",
    packagingFee,
    shippingFee,
    subtotal: Number(subtotal.toFixed(2)),
    total,
    status: "En attente",
    paymentStatus: "Confirmé (Simulé)",
    createdAt: new Date().toISOString(),
    notes: notes || ""
  };

  orders.unshift(newOrder);
  writeJson(ordersPath, orders);

  // Update inStock quantities
  items.forEach((item) => {
    const sIndex = spices.findIndex((s) => s.id === item.spiceId);
    if (sIndex !== -1 && spices[sIndex].inStock >= item.quantity) {
      spices[sIndex].inStock -= item.quantity;
    }
  });
  writeJson(spicesPath, spices);

  res.status(201).json({ success: true, message: "Commande enregistrée avec succès", data: newOrder });
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { status, trackingNumber } = req.body;
  const orders = readJson(ordersPath);
  const orderIndex = orders.findIndex((o) => o.id === req.params.id);

  if (orderIndex === -1) {
    return res.status(404).json({ success: false, message: "Commande non trouvée" });
  }

  if (status) orders[orderIndex].status = status;
  if (trackingNumber) orders[orderIndex].trackingNumber = trackingNumber;

  writeJson(ordersPath, orders);
  res.json({ success: true, message: "Statut de commande mis à jour", data: orders[orderIndex] });
});

// -------------------------------------------------------------
// 4. Admin Dashboard Analytics KPI
// -------------------------------------------------------------
app.get('/api/admin/stats', (req, res) => {
  const orders = readJson(ordersPath);
  const spices = readJson(spicesPath);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'En attente' || o.status === 'En préparation').length;
  const lowStockSpices = spices.filter((s) => s.inStock <= 20);

  res.json({
    success: true,
    data: {
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalOrders,
      pendingOrders,
      averageBasket: totalOrders ? Number((totalRevenue / totalOrders).toFixed(2)) : 0,
      totalCatalogItems: spices.length,
      lowStockAlerts: lowStockSpices.length,
      lowStockItems: lowStockSpices
    }
  });
});

app.listen(PORT, () => {
  console.log(`🌿 Serveur "Les Épices de Djouma" actif sur http://localhost:${PORT}`);
});
