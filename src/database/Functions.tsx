import { addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { RINCIAN_PERNIKAHAN } from "./Collections"
import { db } from "../firebase"

export async function addDocWithId(collectionId: string, data: any, userId: string) {
    let rinperObject
    try {
        let collectionRef = collection(db, collectionId)
        let docId
        const result = await addDoc(collectionRef, {}).then(res => {
            docId = res.id
            let docRef = doc(db, collectionId + "/" + docId)
            let objectValues = { id: docId, createdAt: serverTimestamp(), latestUpdate: serverTimestamp(), userId: userId, data }
            rinperObject = objectValues
            setDoc(docRef, objectValues)

        })
        if (collectionId) {
            return rinperObject
        }
        return
    } catch (error) {
        alert(error)
    }

}

export const getDataCollection = async (collectionId: string, userId: string) => {
    try {
        let result
        const q = query(collection(db, collectionId), where("userId", "==", userId))
        const querySnapshot = await getDocs(q)
        const docLength = querySnapshot.docs.length
        if (docLength == 1) {
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                result = data

            })
            return result
        } else if (docLength == 0) {
            alert("There is duplicate data")
        }
        return

    } catch (err) {
        alert(err)
    }
}

export const updateDataCollection = async (collectionId: string, data: any, docId: string) => {
    let result
    const docRef = doc(db, collectionId, docId)
    try {
        result = await updateDoc(docRef,
            {
                data: { ...data },
                latestUpdate: serverTimestamp()
            })
        return result
    } catch (error) {
        alert(error)
    }
}