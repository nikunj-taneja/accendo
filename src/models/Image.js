class Image {
  constructor(id, link, dateAdded, owner, isPrivate = true, rating = 0) {
    this.id = id;
    this.link = link;
    this.dateAdded = dateAdded;
    this.owner = owner;
    this.isPrivate = isPrivate;
    this.rating = rating;
  }

  superSize() {
    //TODO implement Image.superSize
  }

  stylize() {
    //TODO implement Image.stylize
  }
}
