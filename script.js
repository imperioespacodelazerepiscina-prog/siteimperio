document.addEventListener("DOMContentLoaded", () => {
  console.log("Site Espaço Império carregado com sucesso!");

  // ================= MODAL GALERIA =================
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");
  const images = document.querySelectorAll(".grid img");
  const closeBtn = document.querySelector(".close");
  const arrowLeft = document.querySelector(".arrow.left");
  const arrowRight = document.querySelector(".arrow.right");

  let indiceAtual = 0;

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      indiceAtual = index;
      abrirModal();
    });
  });

  function abrirModal() {
    modal.style.display = "block";
    modalImg.src = images[indiceAtual].src;
    captionText.innerHTML = images[indiceAtual].alt;
  }

  closeBtn.onclick = () => { modal.style.display = "none"; };
  window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

  arrowRight.addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % images.length;
    abrirModal();
  });

  arrowLeft.addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + images.length) % images.length;
    abrirModal();
  });

  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "ArrowRight") arrowRight.click();
      if (e.key === "ArrowLeft") arrowLeft.click();
      if (e.key === "Escape") modal.style.display = "none";
    }
  });

  // Swipe para mobile
  let startX = 0;
  modalImg.addEventListener("touchstart", e => startX = e.changedTouches[0].screenX);
  modalImg.addEventListener("touchend", e => {
    let diff = startX - e.changedTouches[0].screenX;
    if (diff > 50) arrowRight.click();
    if (diff < -50) arrowLeft.click();
  });

  // ================= FAQ =================
  document.querySelectorAll(".faq-question").forEach((btn, i) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      item.classList.toggle("active");
    });
  });

  // ================= MODO NOTURNO =================
 const toggle = document.getElementById("darkToggle");

// Função para atualizar o ícone
function atualizarIcone() {
  if (document.body.classList.contains("dark")) {
    toggle.textContent = "☀️"; // modo noturno → sol
  } else {
    toggle.textContent = "🌙"; // modo claro → lua
  }
}

// Carregar preferência salva
if (localStorage.getItem("modo") === "dark") {
  document.body.classList.add("dark");
}

// Atualiza o ícone ao carregar a página
atualizarIcone();

// Alternar modo
toggle.onclick = () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "modo",
    document.body.classList.contains("dark") ? "dark" : "light"
  );

  atualizarIcone();
};

  // ================= SIMULADOR =================
  const simularBtn = document.getElementById("simular");
  simularBtn.addEventListener("click", () => {
    const tipo = document.getElementById("tipoEvento").value;
    const pessoas = Number(document.getElementById("convidados").value);
    const data = document.getElementById("dataEvento").value;
    const resultado = document.getElementById("resultadoSimulador");

    if (!tipo || !pessoas || !data) {
      resultado.innerHTML = "⚠️ Preencha todas as opções antes de simular!";
      resultado.style.transform = "scale(1.05)";
      setTimeout(() => resultado.style.transform = "scale(1)", 300);
      return;
    }

    let mensagem = `<strong>🎉 Simulação do seu evento:</strong><br><br>`;

// Avaliando capacidade
if (pessoas <= 60) {
  mensagem += `✅ Número de convidados adequado (${pessoas} pessoas).<br>`;
} 
else if (pessoas <= 80) {
  mensagem += `⚠️ Atenção: acima da capacidade recomendada (60 pessoas).<br>`;
} 
else {
  mensagem += `❌ Capacidade de pessoas excedida.<br>`;
}


    // Tipo de evento
    switch(tipo) {
      case "aniversario": mensagem += "🎂 Tipo: Aniversário, perfeito para família e amigos.<br>"; break;
      case "confraternizacao": mensagem += "🥳 Tipo: Confraternização, diversão garantida.<br>"; break;
      case "corporativo": mensagem += "📊 Tipo: Evento corporativo, espaço ideal para reuniões.<br>"; break;
      case "churrasco": mensagem += "🍖 Tipo: Churrasco, aproveite a área gourmet.<br>"; break;
    }

    // Data
    mensagem += `📅 Data escolhida: ${data}<br>`;
    mensagem += `⏰ Duração aproximada: 13 horas<br>`;
    const diaSemana = new Date(data).getDay();
if (diaSemana === 5 || diaSemana === 6 || diaSemana === 0) {
  mensagem += "🔥 Data muito disputada (sexta a domingo). Recomendamos reservar o quanto antes.<br>";
}

if (pessoas > 60) {
  mensagem += "⚠️ Para esse número de convidados, sugerimos buffet e organização reforçada.<br>";
}

    mensagem += `<br>🎈 Seu evento parece estar incrível e muito divertido  🥳🥳🥳<br>`;
    mensagem += `Clique no link abaixo pra tornar seu evento realidade<br>`;

    // Link WhatsApp
    const textoWhatsapp = `Olá! Quero reservar o Espaço Império para ${tipo}, com ${pessoas} convidados na data ${data}.`;
    const linkWhats = `https://wa.me/5511992168849?text=${encodeURIComponent(textoWhatsapp)}`;

    mensagem += `<a href="${linkWhats}" target="_blank" style="color:var(--dourado); font-weight:bold;">📲 Falar no WhatsApp e reservar</a>`;

    resultado.innerHTML = mensagem;

    // Pequena animação de empolgação
    resultado.style.transform = "scale(1.05)";
    setTimeout(() => resultado.style.transform = "scale(1)", 400);
  });

  // ================= ANIMAÇÕES REVELAÇÃO =================
  const revealElements = document.querySelectorAll(".hero, .feature, .grid img, .audience li");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
});
