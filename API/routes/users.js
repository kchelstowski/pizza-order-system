const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;




router.get('/', async (req, res) => {
    try {
        const result = await User.find()
        return res.send(result)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    const hashedPwd = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
    try {
        const duplicateLogin = await User.findOne({login: req.body.login})
        if (duplicateLogin) {
            return res.status(500).send("USER WITH THIS LOGIN ALREADY EXISTS")
        }
        if (req.body.root) {
            const result = await new User({
                login: req.body.login,
                password: hashedPwd,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
                root: true
            }).save()
            return res.status(200).send(result)
        }
        else {
            const result = await new User({
                login: req.body.login,
                password: hashedPwd,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender
            }).save()
            return res.status(200).send(result)
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/login/:login/:password", async (req,res) => {
    try {
        const user = await User.findOne({login: req.params.login})
        if (user) {
            const cmp = await bcrypt.compare(req.params.password, user.password);
            if (cmp) {
                res.status(200).send(user);
            } else {
                res.status(500).send("Wrong username or password");
            }
        } else {
            res.status(500).send("Wrong username or password");
        }

    } catch (e) {
        console.log(e)
       res.status(500).send(e)
    }
})
router.put("/:login", async (req,res) => {
    const hashedPwd = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
    try {
        const user = await User.findOne({login: req.params.login})
        const userEdited = {
            login: req.body.login,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            root: req.body.root
        }
        //if currentPassword exists, that means the user is changing the password, else changing only data without password
        if (req.body.currentPassword) {
            const cmp = await bcrypt.compare(req.body.currentPassword,user.password)
            if (cmp) {
                await User.findOneAndUpdate({login: req.params.login}, {...userEdited, password: hashedPwd})
                res.status(201).send({...user,...userEdited,password: hashedPwd})
            }
            else {
                res.status(500).send("CURRENT PASSWORD IS WRONG")
            }
        }
        else {
            await User.findOneAndUpdate({login: req.params.login}, userEdited)
            res.status(200).send({...user,userEdited})
        }

    }
    catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})
router.patch("/changeRootStatus/:login", async (req,res) => {
    try {
        await User.findOneAndUpdate({login: req.params.login}, {root: req.body.root})
        return res.status(200).send("USER ROOT STATUS EDITED")
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})
router.delete('/:login', async (req,res) => {
    try {
        await User.findOneAndDelete({login: req.params.login})
        return res.status(200).send({message: "USER DELETED"})
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }


})



module.exports = router;
