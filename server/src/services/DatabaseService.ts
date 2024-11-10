import { MONGO_URI } from '@configs'
import { InternalServerError } from '@models/ErrorModels'
import { PostClass } from '@models/PostModel'
import { UserClass } from '@models/UserModel'
import { DocumentType } from '@typegoose/typegoose'
import mongoose from 'mongoose'

type SupportedDocumentTypes = DocumentType<PostClass> | DocumentType<UserClass>

class DatabaseService {
    public setup = async (): Promise<void> => {
        await mongoose.connect(MONGO_URI)
    }

    private saveDocument = async (document: SupportedDocumentTypes) => {
        try {
            await document.save({
                validateBeforeSave: true,
            })
        } catch (e) {
            console.log(`Validation failed for creation of ${document.baseModelName}`, e)
            throw new InternalServerError()
        }
    }
}

export default new DatabaseService()
