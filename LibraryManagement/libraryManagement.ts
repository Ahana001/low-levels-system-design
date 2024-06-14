class Book {
  private static idCounter: number = 0;
  public readonly id: number;
  public title: string;
  public author: string;
  public isAvailable: boolean;

  constructor(title: string, author: string) {
    this.id = ++Book.idCounter;
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }
}

class Member {
  private static idCounter: number = 0;
  public readonly id: number;
  public name: string;
  public borrowedBooks: Book[];

  constructor(name: string) {
    this.id = ++Member.idCounter;
    this.name = name;
    this.borrowedBooks = [];
  }

  borrowBook(book: Book): void {
    if (book.isAvailable) {
      book.isAvailable = false;
      this.borrowedBooks.push(book);
      console.log(`${this.name} borrowed "${book.title}"`);
    } else {
      console.log(`Book titled "${book.title}" is not available.`);
    }
  }

  returnBook(book: Book): void {
    const bookIndex = this.borrowedBooks.indexOf(book);
    if (bookIndex > -1) {
      book.isAvailable = true;
      this.borrowedBooks.splice(bookIndex, 1);
      console.log(`${this.name} returned "${book.title}"`);
    } else {
      console.log(
        `Book titled "${book.title}" was not borrowed by ${this.name}.`
      );
    }
  }
}

class Library {
  public books: Book[];
  public members: Member[];

  constructor() {
    this.books = [];
    this.members = [];
  }

  addBook(title: string, author: string): void {
    const newBook = new Book(title, author);
    this.books.push(newBook);
  }

  removeBook(book: Book): void {
    const bookIndex = this.books.indexOf(book);
    if (bookIndex > -1) {
      library.books.splice(bookIndex, 1);
    }
  }

  addMember(name: string): void {
    const newMember = new Member(name);
    this.members.push(newMember);
  }

  findBookById(bookId: number): Book | undefined {
    return this.books.find((book) => book.id === bookId);
  }

  findMemberById(memberId: number): Member | undefined {
    return this.members.find((member) => member.id === memberId);
  }
}

const library = new Library();

library.addBook("The Great Gatsby", "F. Scott Fitzgerald");
library.addBook("To Kill a Mockingbird", "Harper Lee");

library.addMember("John Doe");
library.addMember("Jane Smith");

const memberJohn = library.findMemberById(1);
const bookGatsby = library.findBookById(1);

if (memberJohn && bookGatsby) {
  memberJohn.borrowBook(bookGatsby);
}

if (memberJohn && bookGatsby) {
  memberJohn.returnBook(bookGatsby);
}
