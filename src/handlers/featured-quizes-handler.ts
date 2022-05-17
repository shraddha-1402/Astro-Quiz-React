import { collection, DocumentData, getDocs } from "firebase/firestore";
import { Dispatch } from "react";
import { db } from "../firebase.config";

const getFeaturedQuizes = async ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "FeaturedQuizes"));
    let featuredQuizes: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) featuredQuizes.push({ data: doc.data(), id: doc.id });
    });
    return featuredQuizes;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    setIsLoading(false);
  }
};

export { getFeaturedQuizes };
