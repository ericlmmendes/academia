// bd.js - Banco de dados (Firebase)
// Este arquivo expõe o objeto global `DB` com métodos assíncronos de CRUD,
// atualizado para gerenciar Clientes.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  update,
  remove,
  set,
  get,
} from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js';

const firebaseConfig = {
  apiKey: "AIzaSyCPoCn98zQYHhsQp7oYyYC3p6pejLyCKdk",
  authDomain: "tough-messenger-467220-h2.firebaseapp.com",
  databaseURL: "https://tough-messenger-467220-h2-default-rtdb.firebaseio.com",
  projectId: "tough-messenger-467220-h2",
  storageBucket: "tough-messenger-467220-h2.firebasestorage.app",
  messagingSenderId: "797984737364",
  appId: "1:797984737364:web:7c9cf10ca4169e581f45c1"
};

let database = null;
let firebaseReady = false;

function log(msg, ...args) {
  console.log('[DB]', msg, ...args);
}

async function initFirebase() {
  if (firebaseReady) return;

  try {
    const app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    firebaseReady = true;
    log('Firebase inicializado.');
  } catch (err) {
    console.error('Não foi possível inicializar Firebase:', err);
    firebaseReady = false;
  }
}

function toArrayObject(obj = {}) {
  return Object.entries(obj).map(([key, value]) => ({ id: key, ...value }));
}

async function readFromFirebase(path) {
  await initFirebase();
  if (!firebaseReady) return null;
  try {
    const snapshot = await get(ref(database, path));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (err) {
    console.warn('Erro ao ler Firebase:', err);
    return null;
  }
}

async function writeToFirebase(path, data) {
  await initFirebase();
  if (!firebaseReady) return false;
  try {
    await set(ref(database, path), data);
    return true;
  } catch (err) {
    console.warn('Erro ao gravar Firebase:', err);
    return false;
  }
}

async function pushToFirebase(path, data) {
  await initFirebase();
  if (!firebaseReady) return null;
  try {
    const snapshot = await push(ref(database, path), data);
    return snapshot.key;
  } catch (err) {
    console.warn('Erro ao inserir no Firebase:', err);
    return null;
  }
}

async function removeFromFirebase(path) {
  await initFirebase();
  if (!firebaseReady) return false;
  try {
    await remove(ref(database, path));
    return true;
  } catch (err) {
    console.warn('Erro ao remover no Firebase:', err);
    return false;
  }
}

async function updateItemFirebase(path, id, item) {
  await initFirebase();
  if (!firebaseReady) return false;
  try {
    await update(ref(database, `${path}/${id}`), item);
    return true;
  } catch (err) {
    console.warn('Erro ao atualizar Firebase:', err);
    return false;
  }
}

// ============== UTILITÁRIOS GENÉRICOS ==============
async function getAll(path) {
  const firebaseData = await readFromFirebase(path);
  if (!firebaseData) return [];
  return toArrayObject(firebaseData);
}

async function addItem(path, item) {
  return await pushToFirebase(path, item);
}

async function updateItem(path, id, item) {
  if (!id) return false;
  return await updateItemFirebase(path, id, item);
}

async function deleteItem(path, id) {
  if (!id) return false;
  return await removeFromFirebase(`${path}/${id}`);
}

// ============== GERENCIAMENTO DE CLIENTES ==============
async function getClientes() {
  return await getAll('clientes');
}

async function addCliente(cliente) {
  return await addItem('clientes', cliente);
}

async function updateCliente(id, cliente) {
  return await updateItem('clientes', id, cliente);
}

async function deleteCliente(id) {
  return await deleteItem('clientes', id);
}

// Busca cliente específico pelo email
async function getClienteByEmail(email) {
  const clientes = await getClientes();
  return clientes.find(c => c.email === email) || null;
}

// ============== GERENCIAMENTO DE TREINOS ==============
async function getTreinosGlobais() {
  return await readFromFirebase('treinos');
}

async function saveTreinosGlobais(treinosData) {
  return await writeToFirebase('treinos', treinosData);
}

// Exporta o objeto consolidado
const DB = {
  initFirebase,
  readFromFirebase,
  writeToFirebase,
  getClientes,
  addCliente,
  updateCliente,
  deleteCliente,
  getClienteByEmail,
  getTreinosGlobais,
  saveTreinosGlobais
};

window.DB = DB;

export { DB };