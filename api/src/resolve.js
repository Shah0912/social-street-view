const cloudinary = require('cloudinary').v2
const axios = require('axios')

cloudinary.config({
  cloud_name: 'dw2ejcbvt',
  api_key: '267567191589782',
  api_secret: 'eV-HoiMHwvvmHWLMiuOEim2hfBQ',
})

export const resolvers = {
  Query: {
    /* photo: (user, args) => {
      let result = cloudinary.url(args.imageName)
      console.log(result)
    }, */
    photo: async (_, { file }) => {
      let res = await cloudinary.uploader.upload(file)
      return { url: res.url }
    },
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
/* 
module.exports = resolvers */