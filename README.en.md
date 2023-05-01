const handleChange = event => { const { name, value } = event.currentTarget;
switch (event.target.name) { case 'name': setName(event.target.value); break;
case 'number': setNumber(event.target.value); break; default: return; } };

Was ->

const [contacts, setContacts] = useState(
JSON.parse(localStorage.getItem('contacts')) ?? localStorage.setItem('contacts',
JSON.stringify(startContacts)) );

became ->

const [contacts, setContacts] = useState(()=>
JSON.parse(localStorage.getItem('contacts')) ?? startContacts );
