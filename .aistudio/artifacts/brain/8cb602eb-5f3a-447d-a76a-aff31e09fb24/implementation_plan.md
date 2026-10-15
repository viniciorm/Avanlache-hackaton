# Avalanche RWA Studio: Creación de Activos Digitales y Monitor en Tiempo Real

Plataforma de grado institucional construida sobre el ecosistema Avalanche (C-Chain y Subnets) para diseñar, emitir y gestionar Activos del Mundo Real (RWA) y valores tokenizados, acompañada de un monitor visual en tiempo real de transacciones, mempool, gas tracker y flujo de bloques con finalidad Snowman.

## User Review & Critical Decisions

> [!IMPORTANT]
> A continuación se resumen las decisiones clave alineadas en la fase de clarificación interactiva para guiar la construcción de la plataforma:

- **Activos Principales Confirmados**: Activos del Mundo Real (RWA) y Valores Tokenizados (Bienes Raíces, Crédito Privado, Bonos del Tesoro y Acciones Tokenizadas) con metadatos de cumplimiento regulatorio, restricciones de transferencia y distribución de dividendos.
- **Conectividad Dual Avalanche Confirmada**: Soporte para conexión real Web3 mediante monederos de Avalanche (Core Wallet, MetaMask con Avalanche C-Chain / Fuji Testnet) integrado armónicamente con un modo sandbox interactivo local precargado con cuentas de prueba, grifo (faucet) instantáneo de AVAX y simulación determinista de finalidad Snowman (<1 segundo).
- **Enfoque de Monitoreo Confirmado**: Flujo visual interactivo de bloques de Avalanche en vivo, rastreador dinámico de gas (Base Fee, Priority Fee en nAVAX/Gwei) y monitor de transacciones en tiempo real con inspección de estados de consenso, método decodificado y logs de eventos.

---

## 1. Overview & Core Concept

### Qué Hace la Aplicación
**Avalanche RWA Studio** es un centro de operaciones integral que permite a emisores, inversores y gestores de tesorería:
1. **Crear y Tokenizar RWA**: Asistente paso a paso para desplegar activos digitales basados en contratos inteligentes compatibles con Avalanche (ERC-3643 / Permissioned Tokens), estableciendo reglas de acreditación KYC/AML, límites geográficos, rendimiento anualizado (APY), colateral respaldado y auditoría de documentos legales.
2. **Gestionar el Ciclo de Vida del Activo**: Emisión (Mint), quema (Burn), congelación temporal por cumplimiento, pago de dividendos en AVAX/USDC a tenedores registrados, y configuración de listas de inversores acreditados (Whitelisting).
3. **Monitoreo en Tiempo Real de Transacciones y Bloques**: Un observatorio continuo de la red Avalanche que visualiza el mempool de transacciones pendientes, confirmaciones en sub-segundo mediante el algoritmo Snowman, consumo de cómputo en gas, y trazabilidad completa de cada evento emitido por los contratos.
4. **Portafolio y Transferencias Instantáneas**: Módulo de transferencias P2P entre billeteras verificadas con cálculo de gas estimado en tiempo real y verificación de cumplimiento previa al envío.

### Audiencia Objetivo
- Gestores de fondos y originadores de activos buscando tokenizar deuda privada o bienes inmuebles en Avalanche.
- Oficiales de cumplimiento y tesorería Web3 que demandan visibilidad instantánea de las transacciones.
- Desarrolladores e inversores que operan en Avalanche C-Chain y Subnets.

### Valor Principal
Eliminar la fricción técnica al tokenizar activos tangibles combinando la velocidad récord y finalidad instantánea de Avalanche con una interfaz ejecutiva moderna, clara y sin código obsoleto.

---

## 2. User Experience & Visual Design

### Flujos Clave de Usuario
1. **Onboarding & Conexión de Red**:
   - Selector entre **Avalanche C-Chain Mainnet**, **Fuji Testnet** o **Avalanche Local Sandbox**.
   - Conexión de wallet (Core / MetaMask con detección automática de `window.ethereum`) o cambio a monederos demo precargados con 500 AVAX ficticios y botón de faucet rápido.
2. **Creación de un Activo RWA (Tokenization Wizard)**:
   - *Paso 1: Datos Básicos*: Nombre del activo (ej. *Avalanche Prime Logistics Fund*), Símbolo (ej. *APLF*), Tipo de subyacente (Bienes Raíces, Crédito Privado, Bonos, Commodities).
   - *Paso 2: Valoración & Suministro*: Suministro inicial, Valor Nominal por Token (USD/AVAX), Tasa de Rendimiento Estimada (APY %).
   - *Paso 3: Cumplimiento & Reglas*: Nivel de verificación requerida (Acreditado Reg D/S, KYC Institucional), Jurisdicciones bloqueadas, Congelabilidad de emergencia.
   - *Paso 4: Despliegue en Avalanche*: Firma de transacción (simulada o vía wallet), cálculo de gas nAVAX, emisión y registro en el ledger.
3. **Consola de Gestión de Activos**:
   - Vista de tabla y tarjetas de activos activos: capitalización de mercado, holders activos, balance en tesorería.
   - Acciones directas: Emitir tokens adicionales a un inversor verificado, distribuir rendimientos en masa, congelar transferencias o actualizar valoración del colateral (NAV).
4. **Monitor de Red y Transacciones en Vivo**:
   - **Stream de Bloques Avalanche**: Tarjetas animadas de bloques que caen en tiempo real con su altura (`#Block`), validador, conteo de transacciones, gas utilizado y tiempo de finalidad Snowman (ej. `0.78s - Accepted`).
   - **Gas Meter Dinámico**: Indicador de Base Fee actual en nAVAX (Normal, Rápido, Instantáneo).
   - **Historial de Transacciones con Filtros**: Búsqueda por Hash, Activo, Tipo de Evento (`Deploy`, `Mint`, `Transfer`, `Dividend`, `Burn`). Al hacer clic en una transacción se despliega un panel lateral con los detalles completos del recibo y logs.

### Identidad Visual y Paleta de Colores
- **Dirección Estética**: Minimalismo institucional suizo de alta precisión financiera. Fondos oscuros de grafito profundo con acentos en el icónico rojo bermellón de Avalanche (`#E84142`) y toques de titanio pulido.
- **Regla 60-30-10**:
  - **60% Lienzo Neutro**: Fondo slate ultra-oscuro (`#090D16` / `#0D1322`).
  - **30% Superficies Estructurales**: Paneles y tablas en gris carbón (`#131B2E`) con bordes sutiles ultra-delgados (`border-white/10`).
  - **10% Acentos**: Rojo Avalanche (`#E84142`) en botones principales y marcadores activos, con esmeralda (`#10B981`) para confirmaciones exitosas y ámbar (`#F59E0B`) para mempool pendiente.
- **Tipografía**:
  - Títulos y navegación: `Plus Jakarta Sans` y `Outfit`.
  - Contenido y formularios: `DM Sans`.
  - Cifras financieras, hashes, direcciones hex y métricas de gas: estricto `font-mono tabular-nums`.
- **Top Bar Contract**:
  - Zona 1: Wordmark limpio con isotipo de Avalanche: **AVALANCHE // RWA STUDIO**
  - Zona 2: 4 enlaces directos sin saltos de línea: `Dashboard`, `Activos RWA`, `Monitor en Vivo`, `Transferencias & Tesorería`.
  - Zona 3: Selector de red (Fuji / Mainnet / Sandbox) + Monedero conectado con balance de AVAX y botón `Crear Activo`.

---

## 3. Key Product Decisions & Trade-Offs

### Decisión 1: Arquitectura de Conectividad Dual (Web3 Real + Sandbox Determinista)
- **Enfoque Elegido**: Proporcionar soporte nativo para monederos Web3 reales (Core Wallet, MetaMask) mediante providers EIP-1193 y RPC público de Avalanche C-Chain / Fuji, combinado con un motor local reactivo que permite experimentar inmediatamente sin depender de saldo real ni extensiones instaladas.
- **Por qué**: Brinda una experiencia de usuario sin fricciones (instant-on) para evaluación y pruebas, a la vez que permite a usuarios con Web3 conectarse e interactuar con la red Avalanche real.
- **Alternativas Consideradas**: Exclusivamente Web3 (bloquea a usuarios sin extensión o sin saldo AVAX en Fuji) o exclusivamente simulación (resta credibilidad técnica al proyecto).

### Decisión 2: Modelo de Activo RWA con Cumplimiento (ERC-3643 Simplificado)
- **Enfoque Elegido**: Modelar activos con atributos esenciales de activos del mundo real: Identificador de contrato, Suministro circulante, Valor de Colateral (NAV), Registro de Identidad de Inversores Acreditados y Mecanismo de Pausa/Freeze administrativo.
- **Por qué**: Diferencia inmediatamente esta plataforma de un creador genérico de memecoins, orientándola a la tokenización institucional que Avalanche lidera en la industria financiera (Spruce Subnet, Evergreen, tokenización de bonos).

### Decisión 3: Reactor de Eventos y Finalidad Snowman
- **Enfoque Elegido**: Un despachador de eventos con cola en memoria que produce bloques continuos a intervalos de ~1.5 - 2.5 segundos (reflejando el tiempo de bloque real de Avalanche C-Chain), integrando transacciones de usuario directamente en el siguiente bloque y mostrando la confirmación visual de Snowman Consensus.
- **Por qué**: Otorga la sensación palpable de monitoreo en tiempo real requerida por el usuario, sin saturar el navegador con websockets inestables de nodos externos no autenticados.

---

## 4. Technical Architecture & Data Strategy

### Diagrama de Arquitectura y Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AVALANCHE RWA STUDIO (APP)                            │
├─────────────────────────────────────────────────────────────────────────────┤
│ Top Navigation: Brand Wordmark │ Nav Links │ Network Selector │ Wallet Bar  │
├──────────────────────────────┬──────────────────────────────────────────────┤
│ SIDEBAR WORKSPACE            │ MAIN CONTENT VIEWPORT                        │
│ ├─ Resumen General           │ ┌──────────────────────────────────────────┐ │
│ ├─ Portafolio de RWA         │ │ VISTA ACTIVA:                            │ │
│ ├─ Nuevo Activo RWA (Wizard) │ │ • Dashboard de Métricas RWA              │ │
│ ├─ Monitor de Bloques & Gas  │ │ • Catálogo & Detalle de Activos          │ │
│ ├─ Transacciones en Vivo     │ │ • Formulario de Emisión Paso a Paso      │ │
│ └─ Gestión de Inversores     │ │ • Live Avalanche Block & Mempool Visual  │ │
│                              │ └──────────────────────────────────────────┘ │
├──────────────────────────────┴──────────────────────────────────────────────┤
│ CORE ENGINES & DATA LAYER                                                   │
│ ┌───────────────────────────┐ ┌────────────────────────┐ ┌────────────────┐ │
│ │ Avalanche State Store     │ │ Snowman Block Engine   │ │ Web3 Provider  │ │
│ │ • Assets & Token Supplies │ │ • Real-Time Block Tick │ │ • Core/MetaMask│ │
│ │ • Transaction Ledger      │ │ • Gas Base Fee Model   │ │ • Fuji/Mainnet │ │
│ │ • Whitelist & KYC Records │ │ • Snowman Consensus    │ │ • Local State  │ │
│ └───────────────────────────┘ └────────────────────────┘ └────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Modelo de Datos Principal

```typescript
interface RwaAsset {
  id: string;
  name: string;
  symbol: string;
  category: 'real_estate' | 'private_credit' | 'treasury' | 'equity' | 'commodity';
  contractAddress: string;
  totalSupply: number;
  circulatingSupply: number;
  nominalValueUsd: number;
  navPerToken: number;
  targetApy: number;
  complianceLevel: 'RegD_Accredited' | 'RegS_International' | 'Institutional_KYC';
  isFrozen: boolean;
  createdAt: number;
  issuerAddress: string;
  collateralDocs: string[];
}

interface AvalancheTransaction {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  assetSymbol?: string;
  type: 'DEPLOY_RWA' | 'MINT' | 'TRANSFER' | 'DIVIDEND_PAYOUT' | 'FREEZE_ACCOUNT' | 'WHITELIST_ADD';
  amount?: number;
  gasUsed: number;
  gasPriceGwei: number;
  status: 'pending' | 'accepted' | 'finalized';
  timestamp: number;
  consensusTimeMs: number;
  method: string;
}

interface AvalancheBlock {
  number: number;
  hash: string;
  validator: string;
  txCount: number;
  gasUsed: number;
  gasLimit: number;
  baseFeeGwei: number;
  timestamp: number;
  finalizedTimeSec: number;
}
```

### Mapeo de Componentes Interactivos y Gestión de Estado
- **`Header`**: Muestra estado de red (C-Chain / Fuji / Sandbox), selector modal de red, botón de conexión de monedero (detecta `window.ethereum` y ofrece cambiar a cuentas de prueba), y balance de AVAX.
- **`RwaCreationModal / Wizard`**: Formulario con validación en cada paso, cálculo de costo estimado de despliegue en AVAX, y generación de dirección de contrato Avalanche tipo `0x...`.
- **`AssetManagementView`**: Grilla de activos tokenizados con buscador, selector de categoría, desglose de capitalización, métricas de rendimiento y controles rápidos (`Emitir`, `Pagar Dividendos`, `Ver Contrato`).
- **`LiveTransactionMonitor`**: Trazador visual con selector de vista (Todas, Emisiones, Transferencias, Cumplimiento), barra de búsqueda por hash, panel de detalle con logs decodificados y copiado al portapapeles.
- **`AvalancheBlockStream`**: Componente visual de flujo continuo donde los nuevos bloques entran con animación suave de entrada, mostrando la validación del protocolo Snowman y el gas consumido.
- **`GasTrackerWidget`**: Indicador en vivo de tarifas de gas en Avalanche (Base fee en nAVAX y Gwei) con recomendación para transacciones rápidas.
