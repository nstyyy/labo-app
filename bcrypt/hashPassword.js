const bcrypt = require('bcrypt');
const password = 'test'; // Le mot de passe que tu veux hacher

// Hacher le mot de passe avec bcrypt
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) throw err;
  console.log('Mot de passe haché :', hashedPassword);
});