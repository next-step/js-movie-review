class Renderer {

    components;
    
    constructor() {
        console.log(this)
        this.components = new Map();
    }

    state(initialState) {

        const init = { value: initialState, setState: (newState) => {
            this.notify(initialState, newState);

            console.log("INIT : ", init)
            init.value = newState;
        }};
        
        return init;
    }
    
    // this.components[init] = {
    //     states: [init],
    //     props: [],
    //     render: null
    // };
   

    notify(initState, newState) {
      
        const targets = this.components.get(initState);

        targets.forEach(target => {
            const { render, states, props } = target
            console.log("STATES : ", states, newState)
            render();
        })
    }
    
    add(component) {

        const { render, states, props } = component;

        console.log(states)

        states.forEach(state => {
            if(!this.components.has(state)){
                this.components.set(state, [component]); 
            }
            else {
                this.components[state].push(component);
            }
        })

        console.log("ADD : ", this.components)
        return render().outerHTML;
    }

}

export default Renderer;