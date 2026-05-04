// 🔥 IMPORTS PRIMERO
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 CONFIG (SOLO UNA VEZ)
const firebaseConfig = {
  apiKey: "AIzaSyAc2zoio...",
  authDomain: "cursos-instrumentacion.firebaseapp.com",
  projectId: "cursos-instrumentacion",
};

// 🔥 INICIALIZAR
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 PEDIR CORREO
const correoUsuario = prompt("Ingresa tu correo");

// 🔥 VERIFICAR ACCESO
async function verificarAcceso() {
  const q = query(
    collection(db, "alumnos"),
    where("correo", "==", correoUsuario),
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (data.pagado === true) {
        document.getElementById("contenido").style.display = "block";
        document.getElementById("bloqueado").style.display = "none";
      } else {
        document.getElementById("bloqueado").style.display = "block";
      }
    });
  } else {
    alert("No estás registrado ❌");
  }
}

verificarAcceso();
