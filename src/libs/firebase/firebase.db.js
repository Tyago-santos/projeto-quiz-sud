import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

// Certifique-se de que 'db' está sendo importado corretamente do seu config
import { db } from "./firebase.config";

export const getUserData = async (uid) => {
  try {
    // 1. Cria a referência do documento
    const userRef = doc(db, "users", uid);

    // 2. Busca o documento de forma assíncrona
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // .data() agora é um método, não uma propriedade
      return userSnap.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const setUserData = async (userId, data) => {
  try {
    // Em vez de db.collection("users").doc(userId).set(data)
    // Usamos:
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, data);

    return true;
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    throw error;
  }
};

// Função para sanitizar nome da categoria para usar como document ID
const sanitizeCategoryId = (category) => {
  return category.replace(/[^a-zA-Z0-9_-]/g, "_");
};

// Função para salvar pontuação do usuário em uma categoria
export const saveUserScore = async (userId, userName, category, score) => {
  try {
    if (!category || typeof category !== "string") {
      console.error("Categoria inválida:", category);
      return false;
    }
    const categoryId = sanitizeCategoryId(category);
    const scoreRef = doc(
      collection(db, "rankings", categoryId, "scores"),
      userId,
    );

    // Verificar se já existe uma pontuação maior
    const existingDoc = await getDoc(scoreRef);
    if (existingDoc.exists()) {
      const existingScore = existingDoc.data().score;
      if (score <= existingScore) {
        console.log(
          "Pontuação não atualizada, já existe maior ou igual:",
          existingScore,
        );
        return false; // Não atualizar se a nova pontuação for menor ou igual
      }
    }

    const scoreData = {
      userId,
      userName,
      category,
      score,
      timestamp: new Date(),
    };
    await setDoc(scoreRef, scoreData);
    return true;
  } catch (error) {
    console.error("Erro ao salvar pontuação:", error);
    throw error;
  }
};

// Função para obter as melhores pontuações de uma categoria
export const getTopScores = async (category, limitCount = 10) => {
  try {
    const categoryId = sanitizeCategoryId(category);
    const scoresRef = collection(db, "rankings", categoryId, "scores");
    const q = query(scoresRef, orderBy("score", "desc"), limit(limitCount));
    const querySnapshot = await getDocs(q);
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push(doc.data());
    });
    return scores;
  } catch (error) {
    console.error("Erro ao buscar pontuações:", error);
    throw error;
  }
};
