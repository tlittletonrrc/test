this api is for using a company brances and employees.

you can either clone or download the file.
if you clone the file you need git installed and do git clone https://github.com/tlittletonrrc/ModuleTwo.git
then once you are done that go into the file and do git checkout moduleFive
note you will still need git todo that part even if you downloaded the file.
then install node and npm and one thoes are installed run npm install.
then after that is done running you can then run the program by using npm start.

once you have that done you will need to add a file called .env in the root of the project

here is what you need to put in that file 

NODE_ENV=development
PORT=3000
FIREBASE_PROJECT_ID=modulethree-79eab
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCpTnzo3UveHpJy\nG23owt3/BpYivtCAgxioDFpDwPQxLX4WRAl8zk4W34GbZDA7W2yMFfgLNigiMSQm\ndA7jYO4aejESOKcD52IhdjWLH2vCkW9S6l4X2wYnee8ue2VPIIJg/LqJmQU1XG/Z\n5DFzhhR51stzGYuqvMiCZGMVG2q1JAMVFAG8EiHe5GMdgzasx+ezKwQNiluKmxV4\nWVeBtzAOL8Ud3JebbgDWTZHBT2ma/Ko4CQlb0TALwOsqfT8JLi6+aUQdXA2Pci/T\nTLgvFrN6WB4NkG0IxuiBy51PMQLx/ND0WIvun2q7CbPUpNarlIpRpi8BYZ2YSeUm\n7bC1KgKXAgMBAAECggEAQ6WeKAbfvOi3N8t431MZE0BE9a4LLgXzcJW67S5oA0w7\ngFb/+XOO5Pm51eYylUzisphGiuhBIeRDnu+pUTWV/VNMTwz+woMNhPQv0Z4k1tF4\nSwdkwCBdtaE1LXvVT0fcgDcKq1bOK3N7J3LTRWbRwJrPoHYZBYe3j83ffvv851HN\nX/OAfW3eiDQzvuI0RGRAHHatpjymGzEv/REqB8NuoPjOZJHwSQA/23zFWgeZogP1\ndoR4/tmxNqqDw6Q/4V9VGWx/IAjVYwPYBto3TaEszPbDsr/aPsZTtVoC3V28Ey4c\nT8kIItMjwCvKauSDKYrL29gWxDfTgeRH6LZXT7QcvQKBgQDR801I3mTeTl+hWNCh\nOYJQZhCEYaFgKrRXLH2Jf7A+kTLo7Xliof+0ykPL2EQ3qkTfm/4RSBy0r+cCbICz\ntW1n8vhDwOLDaRuZCQLkq4H1ZBe7FvXh8KjdFd50JgS61JQx4HnpEtSQ/FMPVBfY\nAD9ufowZfPIyMUqlKXvC06uy6wKBgQDOcQomiw2MFc2Jr2ezMGzuZaYz0TbDuBdm\nE5MJulAMI7/WTgk+8mV5qVHXZvqbmj/olE9ynvuSAxlKTeFe2mV+mm0tqO44mQNg\nc3Y25wRcQ0uvvz1KihSHBx1o/L4+dOVZTK/QFyqrGUWY4E+yO1+dSYnkC7SdXg3B\nVPdBMyWMBQKBgA2tCJK/kdh9SHNtIqHt6hQsodTNu0JVZcvr5P2I6MUaljNgDLEl\nFlADgOkNXFw35iaeta0QgnYuoyCgSr3qCodj51IahWrvNNICKUMV/PAsJfOU6k1e\nbNGB9CyisVouML0S/z30cQ5EsXBlLOxwD7G14pBieDBWz6L0kdA+E4gjAoGAEp9v\n4vo4RqLQ39LK8Ac2TGsvCw2cextoQPUTFpWQEwhGjfaMLvl+3fLAR0Yq5U6M5VY7\ntINS/mD5LxLHed8JuNoFb1EF7GUhQNopl9pPMmN/uGLwDIFYSLYDmSzznH6/Eccx\nNPxiBP1KoffaOKHShkXUApZrvKZ3ZzFa/K64fGECgYBdIoyNuuee+9EXtIbUjjAu\nRhUvpp5dXiHaAfmvybGuQN9uQJ8wT6677CopCboKZvOoURgEBtwI8AZI4L58LHGj\nyY5n1O5mx3miJ0JdoSVHXMlHyHB0+naHprrzZbTYlVH9voUUSfFl8MOaO3/uQU8h\n0lT+z/616J/FS6QALeWKqw==\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@modulethree-79eab.iam.gserviceaccount.com
SWAGGER_SERVER_URL=http://localhost:3000/api/v1
ALLOWED_ORIGINS=https://www.npmjs.com,https://developer.mozilla.org



to use the app go to http://localhost:3000/api/v1/employees
but you will have to put in an api path which can be
/ which gets you all of the employees
or /:id to get an empolyee by there id


link to api documentation
