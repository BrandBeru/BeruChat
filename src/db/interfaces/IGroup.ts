interface IGroup{
  chatId: String,
  name: String,
  description: String,
  admins: [],
  meta: {
    createdDate: String,
    modifiedDate: String,
    isActive: Boolean
  }
}
