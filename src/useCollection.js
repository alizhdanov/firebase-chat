import { useState, useEffect } from "react";
import { db } from "./firebase";

function useCollection(path, orderBy) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let connection = db.collection(path);

    if (orderBy) {
      connection = connection.orderBy(orderBy);
    }

    return connection.onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setDocs(docs);
    });
  }, [path, orderBy]);

  return docs;
}

export default useCollection;
