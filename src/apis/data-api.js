import firebase from 'firebase'
const db = firebase.firestore()
export async function addData(name, age, date) {
  await db.collection('data').doc(name).set({ name, age, date })
  return true
}
export async function getData() {
  let dataSnapshot = await db.collection('data').get()
  const alldata = [];
  dataSnapshot.forEach(data => {
    alldata.push(data.data())
  })

  return alldata

}

export async function getImageData() {
  let dataSnapshot = await db.collection(process.env.REACT_APP_IMAGE_COLLECTION).get()
  const allImageData = [];
  dataSnapshot.forEach(data => {
    allImageData.push(data.data())
  })

  return allImageData
}

export async function handleAddImage(imageData) {
 const added =  await db.collection(process.env.REACT_APP_IMAGE_COLLECTION).add(imageData);
  return added
}

