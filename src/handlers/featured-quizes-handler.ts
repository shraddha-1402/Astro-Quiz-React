import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "..";

const getFeaturedQuizes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "FeaturedQuizes"));
    let featuredQuizes: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) featuredQuizes.push(doc.data());
    });
    return featuredQuizes;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getFeaturedQuizes };
