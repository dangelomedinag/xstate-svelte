
const { db, util } = require('../firestore.js');
const { allowCors } = require('../cors-middleware.js');

// module.exports = (req, res) => {
//   const {id} = req.body;
	
// 	let documentRef = db.doc(`productos/${id}`)

// 	documentRef.get().then(documentSnapshot => {
//   let current = documentSnapshot.data().likes;

// 		documentSnapshot.ref.update({likes: current + 1}).then(result => {
// 			res.status(200).json({id, likes: current + 1, updated_at: result._writeTime._seconds}).end()
// 		})
// 	}).catch(err=> {
// 		res.status(301).json(JSON.stringify({message: "no se pudo actualizar el documento", err})).end()
// 	})
// }


// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

const handler = (req, res) => {
	const {id, user} = req.body;


	
	let documentRef = db.doc(`comments/${id}`)

	documentRef.get().then(documentSnapshot => {
  let current = documentSnapshot.data().likes;

		documentSnapshot.ref.update({likes: util.FieldValue.increment(1), users_likes: util.FieldValue.arrayUnion(user)}).then(result => {
			res.status(200).json({id, likes: current + 1, updated_at: result._writeTime._seconds}).end()
		})
	}).catch(err=> {
		res.status(301).json(JSON.stringify({message: "no se pudo actualizar el documento", err})).end()
	})
}

module.exports = allowCors(handler)