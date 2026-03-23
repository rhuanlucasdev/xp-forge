# 🧙‍♂️ XPForge

XPForge é uma ferramenta de planejamento e cálculo de progresso inspirada em sistemas de leveling estilo RuneScape.

O objetivo do projeto é fornecer uma forma simples e eficiente de calcular experiência (XP), progresso entre níveis e planejamento de evolução — com foco em qualidade de código e arquitetura escalável.

---

## 🚀 Tech Stack

- Next.js (App Router)
- TypeScript
- TailwindCSS
- Arquitetura baseada em features

---

## 🧠 Features

### ✅ XP System (Core)

Implementação completa do sistema de experiência:

- 📈 Geração de tabela de XP baseada em fórmula (não hardcoded)
- 🔒 Validação de domínio (levels e XP)
- 🧮 Cálculo de XP entre níveis
- 📊 Progresso dentro do nível atual
- ⏫ XP restante para próximo nível
- 🔍 Detecção de level a partir de XP

---

## 📂 Estrutura

.
├──src/
│ ├── features/
│ │ ├── xp-calculator/
│ │ │ ├──xp.constants.ts # geração da tabela de XP
│ │ │ ├──xp.service.ts # regras de negócio
│ │ │ ├──xp.types.ts # tipagem


---

## 🧪 Validação

O core foi testado manualmente garantindo:

- XP crescente (sem inconsistências)
- Valores corretos até level 99 (~13M XP)
- Edge cases tratados (níveis inválidos, XP negativo)
- Progress sempre entre 0 e 1

---

## 🧠 Decisões Técnicas

### ✔️ Tabela de XP gerada via fórmula
Evita inconsistência e facilita manutenção futura.

### ✔️ Tipagem simples + validação em runtime
Evita complexidade desnecessária no TypeScript.

### ✔️ Lógica isolada por feature
Facilita testes, reuso e escalabilidade.

---

## 📌 Próximos passos

- [ ] Interface de cálculo (UI)
- [ ] Melhorias de UX (inputs controlados, feedback visual)
- [ ] Persistência de progresso
- [ ] Skill planner completo
- [ ] Autenticação

---

## 🎯 Objetivo

Este projeto faz parte do meu portfólio como desenvolvedor, com foco em:

- Arquitetura limpa
- Código escalável
- Boas práticas com TypeScript
- Uso consciente de IA no desenvolvimento

---