# Usermanagement App

# TimeLine

1. Created figma File [Link(https://www.figma.com/design/WxOnQ5uRdIlDUrNowpEvGN/Untitled?node-id=0-1&t=5d5y6ptplrhhiniv-1)]
2. Created Navbar Component with modular CSS.
3. Created SearchBar Component with modular CSS.
4. Added function to delete user with the help of the id.
5. Created UserList with Add User Modal.
6. Added function to add user, make user.
7. Added function to edit user.
8. media query for max width 480px.


# Assumptions

1. First I created search bar a separate component, but later made it in Table component only for easier state management.

# Problems Faced & Solution

1. List was increasing page height when I was adding more users, later gave that div a fixed height with overflow-x as scroll.
2. Was editing without stroing id which led to problem, later i used a seaparate state for keeping track of the id of the user which we are editing.