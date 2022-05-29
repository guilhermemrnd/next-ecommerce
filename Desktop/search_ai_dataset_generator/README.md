# Gerador de nome de produtos

## O problema

Nós temos uma IA que vai receber como **input** o nome de um produto e a pesquisa em que ele foi encontrado, então, ela deve devolver como **output** uma probabilidade de que este produto deveria ser considerado ou não relacionado à pesquisa.

Para isso utilizamos uma rede neural. Mas para treinar uma rede neural é necessário uma dataset enorme, que teria de existir neles um **nome de produto**, **pesquisa** e um **devia aparecer**, onde:

* Nome do produto: é o nome do produto em questão
* Pesquisa: a pesquisa no contexto
* Devia aparecer: 1 se o **nome do produto** tem relação com a **pesquisa** 0 se não

Mas, não existe nenhum dataset para isso, e se nós apenas capturarmos os dados de algum website, ou de mais de um, nós teremos o meso problema de antes.

## A solução

Para solucionar isso nós temos este projeto.

O objetivo deste projeto é exatamente gerar nomes de produtos baseado em uma pesquisa e umas **palavras chaves** que ele vai usar.

