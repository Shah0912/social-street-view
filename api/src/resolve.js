import dotenv from 'dotenv'
const cloudinary = require('cloudinary').v2
const axios = require('axios')

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
// Config cloudinary

export const resolvers = {
        Mutation: {
                  /* photo: (user, args) => {
            let result = cloudinary.url(args.imageName)
            console.log(result)
          }, */
          photo: async (_, args) => {
            let res = await cloudinary.uploader.upload(args.file)
            return {
              caption: args.caption,
              id: args.id,
              url: res.url,
            }
          },

          uploadImage: (_, {file, uploadOptions}) => cloudinary.uploader.upload(file, uploadOptions)
          

        },

        

         /* Query: {
    getImageUrl: (_, { imageName, transformOptions }) => {
      let result = ''
      if (transformOptions) {
        result = cloudinary.url(imageName, { ...transformOptions })
      } else {
        result = cloudinary.url(imageName)
      }
      return {
        imageLink: result,
      }
    },
  },
  Mutation: {
    uploadImage: (_, { file, uploadOptions }) =>
      cloudinary.uploader.upload(file, uploadOptions),
  }, */
}

// module.exports = resolvers;


// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// })

// const resolvers = {
//   Mutation: {
//     uploadImage: (_, { file, uploadOptions }) => cloudinary.uploader.upload(file, uploadOptions)
//   }
// };

// module.exports = resolvers;