import React, { useState } from 'react';
import { Calculator, Shield, TrendingUp, Target, Lightbulb, CreditCard, CheckCircle2, ArrowRight, Users, Lock, BarChart3 } from 'lucide-react';

export const LoginScreen = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const handleGoogleSignIn = async () => {
    console.log('Iniciando login com Google...');
    // Simulação do processo de login
  };

  const features = [
    {
      icon: BarChart3,
      title: "Dashboard Inteligente",
      description: "Tenha uma visão 360º da sua saúde financeira num único ecrã. Acompanhe o seu saldo, score financeiro e próximos vencimentos.",
      highlight: "Visão Completa"
    },
    {
      icon: TrendingUp,
      title: "Projeções de Futuro",
      description: "Veja o seu património a crescer ano após ano. Calcule a sua poupança futura com base no seu salário e despesas.",
      highlight: "Planeamento"
    },
    {
      icon: Target,
      title: "Controlo Total de Orçamentos",
      description: "Diga adeus às surpresas. Crie orçamentos por categoria e acompanhe os seus gastos em tempo real.",
      highlight: "Sem Surpresas"
    },
    {
      icon: Lightbulb,
      title: "Assistente Proativo",
      description: "Receba insights e dicas inteligentes para otimizar os seus gastos e identificar onde pode poupar mais.",
      highlight: "IA Integrada"
    },
    {
      icon: CreditCard,
      title: "Gestão de Dívidas Simplificada",
      description: "Organize despesas recorrentes e compras parceladas num único lugar. Nunca mais se esqueça de um pagamento.",
      highlight: "Organizado"
    },
{
  icon: Lock,
  title: "Privacidade com sincronização opcional",
  description: "Dados criptografados localmente, sincronização segura na nuvem quando ativada, controle total sobre compartilhamento e acesso",
  highlight: "Seguro"
}

  ];

  const stats = [
    { number: "Beta", label: "Fase atual" },
    { number: "1.2k+", label: "Beta testers" },
    { number: "100%", label: "Privado" }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-between p-4">
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2items-center">
            
            {/* Mobile Header - Visible only on mobile */}
            <div className="lg:hidden w-full mb-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto shadow-lg border border-slate-700">
                  <Calculator className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">CLT Finance</h1>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30">
                      <span className="text-amber-300 text-sm font-medium">Fase Beta</span>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  O Assistente Financeiro
                  <span className="block text-slate-300 font-normal text-lg mt-1">
                    Definitivo para o Trabalhador CLT
                  </span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Assuma o controlo do seu salário, 13º, benefícios e despesas como nunca antes.
                </p>
              </div>
            </div>

            {/* Lado esquerdo - Informações - Hidden on mobile */}
            <div className="hidden lg:block space-y-8">
              {/* Header */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-700">
                    <Calculator className="w-8 h-8 text-slate-300" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                      CLT Finance
                      <div className="px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30">
                        <span className="text-amber-300 text-sm font-medium">Beta</span>
                      </div>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Versão Beta • Teste gratuito</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    O Assistente Financeiro
                    <span className="block text-slate-300 text-3xl lg:text-4xl font-normal mt-2">
                      Definitivo para o Trabalhador CLT
                    </span>
                  </h2>
                  <p className="text-xl text-slate-400 leading-relaxed">
                    Assuma o controlo do seu salário, 13º, benefícios e despesas como nunca antes.
                  </p>
                </div>

                {/* Beta Call-out */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-amber-400" />
                    <h3 className="font-semibold text-amber-300">Estamos em Fase Beta!</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Junte-se a nós, teste as funcionalidades e ajude a construir a melhor ferramenta para as suas finanças. A sua opinião é fundamental!
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features rotativas */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Funcionalidades principais
                </h3>
                
                {/* Mobile: Show only active feature */}
                <div className="lg:hidden">
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-4">
                      {features.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === activeFeature ? 'bg-slate-400 w-6' : 'bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {(() => {
                      const feature = features[activeFeature];
                      const Icon = feature.icon;
                      return (
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-slate-700 border border-slate-600">
                            <Icon className="w-6 h-6 text-slate-300" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                                {feature.highlight}
                              </span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Desktop: Show all features */}
                <div className="space-y-3">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    const isActive = index === activeFeature;
                    
                    return (
                      <div
                        key={index}
                        className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-500 cursor-pointer ${
                          isActive 
                            ? 'bg-slate-800/60 backdrop-blur-sm border border-slate-600 scale-105' 
                            : 'bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50 border border-slate-700/50'
                        }`}
                        onClick={() => setActiveFeature(index)}
                      >
                        <div className="relative flex items-center gap-4">
                          <div className={`p-3 rounded-2xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-slate-700 border border-slate-600' 
                              : 'bg-slate-800 border border-slate-700'
                          }`}>
                            <Icon className="w-5 h-5 text-slate-300" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                              {isActive && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                                  {feature.highlight}
                                </span>
                              )}
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                          
                          {isActive && (
                            <CheckCircle2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Features mobile */}
            <div className="lg:hidden">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  {features.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeFeature ? 'bg-slate-400 w-6' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
                
                {(() => {
                  const feature = features[activeFeature];
                  const Icon = feature.icon;
                  return (
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-slate-700 border border-slate-600">
                        <Icon className="w-6 h-6 text-slate-300" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                            {feature.highlight}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Lado direito - Login */}
            <div className="flex justify-center w-full">
              <div className="w-full max-w-md">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-2xl">
                  {/* Header do card */}
                  <div className="text-center mb-6 lg:mb-8">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-slate-700">
                      <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-slate-300" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-2">
                      Começar Agora
                    </h3>
                    <p className="text-slate-600 text-sm lg:text-base mb-4">
                      É completamente grátis durante a fase Beta
                    </p>
                    
                    {/* Beta highlight */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span className="text-amber-800 text-sm font-medium">Teste Beta Gratuito</span>
                    </div>
                  </div>

                  {/* Mobile Stats */}
                  <div className="lg:hidden grid grid-cols-3 gap-4 mb-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-slate-900">{stat.number}</div>
                        <div className="text-xs text-slate-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Benefícios rápidos */}
                  <div className="space-y-2 lg:space-y-3 mb-6 lg:mb-8">
                    {[
                      "Setup rápido em minutos",
                      "100% offline e privado",
                      "Teste todas as funcionalidades",
                      "Feedback direto com a equipe"
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span className="text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botão de login */}
                  <button
                    onClick={handleGoogleSignIn}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="w-full relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-slate-900/25 group active:scale-95"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span className="text-sm lg:text-base">Entrar com Google</span>
                      <ArrowRight className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                    </div>
                  </button>

                  {/* Segurança */}
                  <div className="mt-4 lg:mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Lock className="w-4 h-4" />
                    <span>Dados 100% privados e armazenados localmente</span>
                  </div>

                  {/* Beta disclaimer */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-slate-500">
                      Como beta tester, o seu feedback é essencial para aperfeiçoarmos a plataforma
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 py-4">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-slate-500 text-xs lg:text-sm leading-relaxed">
              Ao continuar, você concorda com nossos{' '}
              <button className="text-slate-400 hover:text-slate-300 underline transition-colors">
                Termos de Uso
              </button>{' '}
              e{' '}
              <button className="text-slate-400 hover:text-slate-300 underline transition-colors">
                Política de Privacidade
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};