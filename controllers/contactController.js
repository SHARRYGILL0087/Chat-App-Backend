import contacts from "../models/contacts.js"
import connectDB from "../db/dbConnection.js"

const contactController = {
  getContacts: async (req, res) => {
    try {
      const { userId } = req.body
      await connectDB()
      const contact = await contacts.findOne({ userId })
      console.log('get contact', contact)
      if(!contact) return res.status(201).json({msg : 'No Contacts Found' , contact : null})
      res.status(200).json({ msg: 'Contacts Obtained', contact })
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ msg: 'Error while getting contacts', error: error.message })
    }
  },
  postContact: async (req, res) => {
    try {
      const { userId, contact } = req.body
      await connectDB()
      const existUser = await contacts.findOne({ userId })
      if (existUser) {
        const alreadyExist = existUser.contacts.some(c => c.contactId === contact.contactId)
        if (alreadyExist)  return res.status(400).json({ msg: 'Contact already exists' })

        existUser.contacts.push(contact)
        await existUser.save()
      }
      else {
        const newContact = new contacts({ userId: userId, contacts: [contact] })
        await newContact.save()
      }
      res.status(200).json({ msg: 'Contact Added' })
    } catch (error) {
      console.log('Error while adding contact', error.message)
      res.status(500).json({ msg: 'Error while adding contact', err: error.message })

    }
  }
}

export default contactController
