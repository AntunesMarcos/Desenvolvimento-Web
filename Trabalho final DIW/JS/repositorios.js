const nome = document.querySelector('.logo');
const descricaoFinal = document.querySelector('.repo-list');
const descricao = document.querySelector('.repo-card');

async function description() {
    const urlParams = new URLSearchParams(window.location.search);
    const reposit = urlParams.get('repo');
    const repoApi = `https://api.github.com/repos/AntunesMarcos/${reposit}`

    fetch(repoApi)
        .then(res =>  res.json() )
        .then(data => {
            
            let str= `
            <div class="repo-info">
                <h4>Repositório: ${data.name}</h4>
                <p>Descrição: ${data.description || "Esse repositório não tem descrição"}</p>
                <p><strong>Data de Criação:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
                <p><strong>Linguagem:</strong> ${data.language}</p>
                
            </div>
            <div class="repo-footer">
                <span> ${data.stargazers_count}⭐</span>
                <span> ${data.watchers}👁</span>
                <span> ${data.forks_count}🍴</span>
            </div>
            <div><p><a href="${data.html_url}" class="github">GitHub</a></p></div>
        `;

            descricao.innerHTML = str;
        })
    .catch(error => {
        console.log(error);
    });
}

function nomeUsuario() {
    fetch('http://api.github.com/users/AntunesMarcos')
        .then(async response => {
        if(!response.ok) {
            throw new Error(response.status);
            }
            
            let data = await response.json();
            nome.innerHTML = `
                <a href="../views/index.html" style="text-decoration: none; color:white"><h3>${data.name}</h3></a>
            `;
    })


}
nomeUsuario();
description();