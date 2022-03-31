
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()


app.use(express.json())


const User = require ('./models/User')



app.get('/', (req,res) => {
    res.status(200).json({ msg: 'Bem-vindo a API' })
})


app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id


const user = await User.findById(id, '-password -cpf -rg')

if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!'})
}

res.status(200).json({ user })

})

function checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' })
    }

    try{

        const secret = process.env.SECRET

        jwt.verify(token, secret)

        next()
    } catch(error) {
        res.status(400).json({ msg: 'Token inválido!' })
    }
}


app.post('/auth/register', async (req, res) => {
    const {name, email, password, confirmpassword, cpf, rg} = req.body


    if(!name) {
        return res.status(422).json({ msg: 'O campo NOME é obrigatório!' })
    }

    if(!email) {
        return res.status(422).json({ msg: 'O campo EMAIL é obrigatório!' })
    }

    if(!password) {
        return res.status(422).json({ msg: 'O campo SENHA é obrigatório!' })
    }

    if(password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não são idênticas!' })
    }

    if(!cpf) {
        return res.status(422).json({ msg: 'O campo CPF é obrigatório!' })
    }

    if(!rg) {
        return res.status(422).json({ msg: 'O campo RG é obrigatório!' })
    }


const userExists = await User.findOne({ email: email })
    if(userExists) {
        return res.status(422).json({ msg: 'Este EMAIL ja está cadastrado!' })  
}

const cpfExists = await User.findOne({ cpf: cpf })
    if(cpfExists) {
        return res.status(422).json({ msg: 'Este CPF ja está cadastrado!' })  
}

const rgExists = await User.findOne({ rg: rg })
    if(rgExists) {
        return res.status(422).json({ msg: 'Este RG ja está cadastrado!' })  
}


const salt = await bcrypt.genSalt(12)
const passwordHash = await bcrypt.hash(password, salt)


const user = new User ({
   name,
   email,
   password: passwordHash,
   cpf,
   rg,
})

try {
    await user.save()

    res.status(201).json({msg: 'Usuário cadastrado com sucesso!'})

} catch(error) {
    console.log(error)

    res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })
}

})


app.post('/auth/login', async(req, res) => {

    const {email, password} =req.body


if(!email) {
    return res.status(422).json({ msg: 'O campo EMAIL é obrigatório!' })
}

if(!password) {
    return res.status(422).json({ msg: 'O campo SENHA é obrigatório!' })
}


const user = await User.findOne({ email: email })
    if(!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado!' }) 
    }


const checkPassword = await bcrypt.compare(password, user.password)

if(!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida!' })
}

try {

    const secret = process.env.SECRET

    const token = jwt.sign({
        id: user._id,
    }, secret,
    )
    res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token })

} catch(err) {
    console.log(error)

    res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })
}

})



const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.69msx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    ).then(() => {
    app.listen(3000)
    console.log('Connected to Database')
}).catch((err) => console.log(err))

