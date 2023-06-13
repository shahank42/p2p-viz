function d3VisualizeGossip() {
    const data = window.gossip.globalMap

    // Create an array of nodes and links
    let nodes = [];
    let links = [];

    // Iterate through the data and create nodes and links
    for (let key in data) {
        // Add current node
        nodes.push({
            // id: window.peerIdsToAlias[key]
            id: key
        });

        // Add links from the current node to its connected nodes
        let connectedNodes = data[key];

        for (let connectedNode of connectedNodes) {
            if (window.peerIdsToAlias[connectedNode]) {
                links.push({
                    // source: window.peerIdsToAlias[key],
                    // target: window.peerIdsToAlias[connectedNode]
                    source: key,
                    target: connectedNode
                });
            }
        }
    }
    // console.log(nodes, links)

    const chart = ForceGraph({
        nodes,
        links
    }, {
        nodeId: d => d.id,
        nodeGroup: d => d.group,
        nodeTitle: d => d.id,
        linkStrokeWidth: l => Math.sqrt(l.value),
        width: 600,
        height: 600,
        nodeRadius: 10,
        linkStrength: 0.1,
        invalidation: null // a promise to stop the simulation when the cell is re-run
    });

    return chart;    
}