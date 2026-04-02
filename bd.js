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
  apiKey: "AIzaSyDhBIgjv0rFE36zpFyoIbbu2gLLNXvyK2I",
  authDomain: "carretasapp-ea4b7.firebaseapp.com",
  databaseURL: "https://carretasapp-ea4b7-default-rtdb.firebaseio.com",
  projectId: "carretasapp-ea4b7",
  storageBucket: "carretasapp-ea4b7.firebasestorage.app",
  messagingSenderId: "968788273467",
  appId: "1:968788273467:web:f91b3063c9132955926f1e"
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
// Função mantida para o caso de envio customizado via API interna
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
  // Clientes
  getClientes,
  addCliente,
  updateCliente,
  deleteCliente,
  getClienteByEmail,
  // Treinos
  getTreinosGlobais,
  saveTreinosGlobais
};

window.DB = DB;

export { DB };