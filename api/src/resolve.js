const cloudinary = require('cloudinary').v2
const axios = require('axios')

cloudinary.config({
  cloud_name: 'dw2ejcbvt',
  api_key: '267567191589782',
  api_secret: 'eV-HoiMHwvvmHWLMiuOEim2hfBQ',
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